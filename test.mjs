

import tape from "tape"
import embeddedReactFactory, {tokenize, parse} from "./lib"
import {compileToAST} from "defscript-core"

const string = "<hello  > string is cool </hello>"

tape("Tokenize properly", (t) => {
    t.plan(3);

    const tokens = Array.from(tokenize(string));

    t.equal(tokens[0].value, '<');
    t.equal(tokens[3].value, ' string is cool ');
    t.equal(tokens[6].value, 'hello');
});

tape("Parse properly", (t) => {
    t.plan(4);

    const ast = parse(string);

    t.equal(ast.type, 'dom-node');
    t.equal(ast.children.length, 1);
    t.equal(ast.children[0].type, 'text-node');
    t.equal(ast.children[0].text, ' string is cool ');
});

tape("Compile properly", (t) => {
    t.plan(5);

    const code = `
        def embedded = #react
            <NodeName>
                Node issue
            </NodeName>
    `

    const ast = compileToAST(code, {
        type: 'module',
        embedded: {
            react: embeddedReactFactory()
        }
    });

    t.equal(ast.type, 'Program');
    t.equal(ast.body[0].type, 'VariableDeclaration');
    t.equal(ast.body[0].declarations[0].init.callee.property.name, 'createElement');
    t.equal(ast.body[0].declarations[0].init.arguments[0].type, 'Identifier');
    t.equal(ast.body[0].declarations[0].init.arguments[0].name, 'NodeName');
});

tape("Compile attributes", (t) => {
    t.plan(6);

    const code = `
        def embedded = #react
            <NodeName class="heyyo" face={balls}>
                Node issue
            </NodeName>
    `

    const ast = compileToAST(code, {
        type: 'module',
        embedded: {
            react: embeddedReactFactory()
        }
    });

    t.equal(ast.type, 'Program');
    t.equal(ast.body[0].type, 'VariableDeclaration');
    t.equal(ast.body[0].declarations[0].init.callee.property.name, 'createElement');
    t.equal(ast.body[0].declarations[0].init.arguments[0].name, 'NodeName');

    t.equal(ast.body[0].declarations[0].init.arguments[1].properties[1].value.type, 'Identifier');
    t.equal(ast.body[0].declarations[0].init.arguments[1].properties[1].value.name, 'balls');
});

tape("Compile embedded nesting", (t) => {
    t.plan(5);

    const code = `
        def embedded = #react
            <NodeName>
                {halo}
                <NodeToo />
                hello there
            </NodeName>
    `

    const ast = compileToAST(code, {
        type: 'module',
        embedded: {
            react: embeddedReactFactory()
        }
    });

    t.equal(ast.body[0].declarations[0].init.arguments[2].elements[1].type, 'Identifier');
    t.equal(ast.body[0].declarations[0].init.arguments[2].elements[1].name, 'halo');
    t.equal(ast.body[0].declarations[0].init.arguments[2].elements[3].type, 'CallExpression');
    t.equal(ast.body[0].declarations[0].init.arguments[2].elements[3].callee.property.name, 'createElement');
    t.equal(ast.body[0].declarations[0].init.arguments[2].elements[3].arguments[0].name, 'NodeToo');
});