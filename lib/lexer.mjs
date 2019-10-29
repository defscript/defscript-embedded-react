
import {fetchInterpolation} from "defscript-core"
import Lexie from "lexie"


const codePattern = {
    regex: /\{/,
    type: 'code',

    fetch(api) {
        const start = api.position;
        const {length} = fetchInterpolation(api.input, start);

        api.advanceTo(start + length + 1);
    }
}


export default new Lexie({
    states: {
        'start': [
            {
                regex: /[^\<\>\{\}]+/,
                type: 'text'
            },
            codePattern,
            {
                regex: /\</,
                before(api) {
                    api.pushState('tag');
                    api.abort();
                }
            }
        ],
        'tag': [
            {
                // punctuation tokens
                regex: /[\<\>\/\=]/,
                after(api) {
                    if (api.match === '>') {
                        api.popState();
                    }
                }
            },
            {
                regex: /[\t\n ]+/,
                type: 'ws'
            },
            {
                regex: /[a-zA-Z]+/,
                type: 'id'
            },
            {
                regex: /'/,
                type: "simple-string",
                fetch(api) {
                    let escaped = false;
                    while (true) {
                        const c = api.next();
                                        
                        if (c === "'" && !escaped)
                            return;
                        
                        escaped = (c === '\\' && !escaped);
                    }
                }
            },
            {
                regex: /"/,
                type: "rich-string",
                fetch(api) {
                    // fetch whole string, including interpolations
                    let escaped = false;
        
                    while (true) {
                        const c = api.next();
        
                        if (c === '{' && !escaped) {
                            const interpolated = fetchInterpolation(api.input, api.position);
        
                            api.advanceTo(api.position + interpolated.length);
        
                            continue;
                        }
        
                        if (c === '"' && !escaped) {
                            return;
                        }
        
                        escaped = (c === '\\' && !escaped);
                    }
                }
            },
            codePattern
        ]
    }
});