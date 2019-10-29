
import {Parser} from "./parser.out"
import lexer from "./lexer"
import {parse as parseDefScript, EmbeddedLanguage} from "defscript-core"

const isConstructor = (name) => {
    const regex = /^[A-Z]$/;

    return regex.test(name[0]);
}

// alter token stream here...
export const tokenize = function*(string) {
    for (const token of lexer.tokenize(string)) {
        if (token.type !== 'ws') {
            yield token;
        }
    }
}

export const parse = (source) => {
    const parser = new Parser({
        context: {
            node(type, props) {
                return {
                    type,
                    ...props
                }
            },

            parseEmbedded(source) {

                return parseDefScript(source, {type: 'expression'});
            }
        }
    });

    for (const token of tokenize(source)) {

        parser.push(token);
    }

    return parser.finish();
}

export default (options) => {
    class EmbeddedReact extends EmbeddedLanguage {
        parse(source) {
            return parse(source.trim());
        }

        transform(node, transformer) {
            switch (node.type) {
                case 'text-node':
                    return new this.es.Literal({value: node.text});

                case 'code-node':
                    return transformer.transform(node.code);

                case 'dom-node':
                    // const importName = transformer.newVar('React', false);

                    // transformer.addImport('react-dom', importName, );

                    return new this.es.CallExpression({
                        callee: new this.es.MemberExpression({
                            object: new this.es.Identifier({name: 'React'}),
                            property: new this.es.Identifier({name: 'createElement'}),
                            computed: false
                        }),
                        arguments: [
                            // node name (either string or constructor)
                            isConstructor(node.name) ?
                                new this.es.Identifier({name: node.name}) :
                                new this.es.Literal({value: node.name}),

                            // attribute object
                            new this.es.ObjectExpression({
                                properties: node.attributes.map((attribute) => {
                                    return new this.es.Property({
                                        key: new this.es.Literal({
                                            value:
                                              attribute.name === 'class' ?
                                                'className' :
                                                attribute.name
                                        }),

                                        value:
                                          (attribute.value.type === 'code') ?
                                            transformer.transform(attribute.value.code) :
                                          (attribute.value.type === 'string') ?
                                            transformer.transform(attribute.value.string) :

                                            (() => {throw new Error('Bad react AST!')})()
                                    });
                                })
                            }),

                            // children
                            new this.es.ArrayExpression({
                                elements: node.children.map((child) => {
                                    return this.transform(child, transformer);
                                })
                            })
                        ]
                    });

            }
        }
    }

    return EmbeddedReact;
}