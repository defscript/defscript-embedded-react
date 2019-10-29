const {min, max} = Math;
const {freeze} = Object;
const gotoStart = 10;
const translations = map({
    '$$$': 10,
    'dom': 11,
    '$__1': 12,
    'dom.attributes': 13,
    '$__2': 14,
    'dom.node': 15,
    'dom.attributes.string': 16,
    'dom.attributes.attribute': 17,
    'dom.attributes.attribute.value': 18,
    '$': 0,
    '<': 1,
    'id': 2,
    '>': 3,
    '/': 4,
    'text': 5,
    'code': 6,
    'simple-string': 7,
    'rich-string': 8,
    '=': 9
});
const productions = [
    [
        10,
        1
    ],
    [
        11,
        1
    ],
    [
        12,
        0
    ],
    [
        12,
        1
    ],
    [
        12,
        2
    ],
    [
        13,
        1
    ],
    [
        14,
        0
    ],
    [
        14,
        1
    ],
    [
        14,
        2
    ],
    [
        15,
        9
    ],
    [
        15,
        5
    ],
    [
        15,
        1
    ],
    [
        15,
        1
    ],
    [
        16,
        1
    ],
    [
        16,
        1
    ],
    [
        17,
        3
    ],
    [
        18,
        1
    ],
    [
        18,
        1
    ]
];
const reducers = map({
    0: function ($, $loc, $rule) {
        return $[0];
    },
    2: function ($, $loc, $rule) {
        return [];
    },
    3: function ($, $loc, $rule) {
        return [$[0]];
    },
    4: function ($, $loc, $rule) {
        var slice$ = [].slice, arrayFrom$ = Array.from || function (x) {
                return slice$.call(x);
            };
        return arrayFrom$($[0]).concat([$[1]]);
    },
    6: function ($, $loc, $rule) {
        return [];
    },
    7: function ($, $loc, $rule) {
        return [$[0]];
    },
    8: function ($, $loc, $rule) {
        var slice$ = [].slice, arrayFrom$ = Array.from || function (x) {
                return slice$.call(x);
            };
        return arrayFrom$($[0]).concat([$[1]]);
    },
    9: function ($, $loc, $rule) {
        return this.node('dom-node', {
            name: $[1],
            attributes: $[2],
            children: $[4],
            single: false
        });
    },
    10: function ($, $loc, $rule) {
        return this.node('dom-node', {
            name: $[1],
            attributes: $[2],
            children: [],
            single: true
        });
    },
    11: function ($, $loc, $rule) {
        return this.node('text-node', { text: $[0] });
    },
    12: function ($, $loc, $rule) {
        return this.node('code-node', { code: this.parseEmbedded($[0].slice(1, -1)) });
    },
    15: function ($, $loc, $rule) {
        return this.node('attribute', {
            name: $[0],
            value: $[2]
        });
    },
    16: function ($, $loc, $rule) {
        return this.node('code', { code: this.parseEmbedded($[0]) });
    },
    17: function ($, $loc, $rule) {
        return this.node('code', { code: this.parseEmbedded($[0].slice(1, -1)) });
    }
}, parseInt);
const lrTable = {
    action: map({
        '0-1': 's3',
        '0-5': 's4',
        '0-6': 's5',
        '1-0': 'r0',
        '2-0': 'r1',
        '3-2': 's6',
        '4-0': 'r11',
        '5-0': 'r12',
        '6-3': 'r2',
        '6-2': 's10',
        '6-4': 'r2',
        '7-3': 's11',
        '7-4': 's12',
        '8-3': 'r5',
        '8-4': 'r5',
        '8-2': 's10',
        '9-3': 'r3',
        '9-2': 'r3',
        '9-4': 'r3',
        '10-9': 's14',
        '11-1': 's17',
        '11-5': 's18',
        '11-6': 's19',
        '12-3': 's20',
        '13-3': 'r4',
        '13-2': 'r4',
        '13-4': 'r4',
        '14-6': 's23',
        '14-7': 's24',
        '14-8': 's25',
        '15-1': 's26',
        '15-5': 's18',
        '15-6': 's19',
        '16-1': 'r7',
        '16-5': 'r7',
        '16-6': 'r7',
        '17-2': 's28',
        '18-1': 'r11',
        '18-5': 'r11',
        '18-6': 'r11',
        '19-1': 'r12',
        '19-5': 'r12',
        '19-6': 'r12',
        '20-0': 'r10',
        '21-3': 'r15',
        '21-2': 'r15',
        '21-4': 'r15',
        '22-3': 'r16',
        '22-2': 'r16',
        '22-4': 'r16',
        '23-3': 'r17',
        '23-2': 'r17',
        '23-4': 'r17',
        '24-3': 'r13',
        '24-2': 'r13',
        '24-4': 'r13',
        '25-3': 'r14',
        '25-2': 'r14',
        '25-4': 'r14',
        '26-4': 's29',
        '26-2': 's28',
        '27-1': 'r8',
        '27-5': 'r8',
        '27-6': 'r8',
        '28-3': 'r2',
        '28-2': 's10',
        '28-4': 'r2',
        '29-2': 's31',
        '30-3': 's32',
        '30-4': 's33',
        '31-3': 's34',
        '32-1': 's17',
        '32-5': 's18',
        '32-6': 's19',
        '33-3': 's36',
        '34-0': 'r9',
        '35-1': 's37',
        '35-5': 's18',
        '35-6': 's19',
        '36-1': 'r10',
        '36-5': 'r10',
        '36-6': 'r10',
        '37-4': 's38',
        '37-2': 's28',
        '38-2': 's39',
        '39-3': 's40',
        '40-1': 'r9',
        '40-5': 'r9',
        '40-6': 'r9'
    }),
    goto: map({
        '0-11': 1,
        '0-15': 2,
        '6-13': 7,
        '6-12': 8,
        '6-17': 9,
        '8-17': 13,
        '11-14': 15,
        '11-15': 16,
        '14-18': 21,
        '14-16': 22,
        '15-15': 27,
        '28-13': 30,
        '28-12': 8,
        '28-17': 9,
        '32-14': 35,
        '32-15': 16,
        '35-15': 27
    })
};
function map(obj, kFunc = k => k) {
    const mp = new Map();
    for (let key in obj)
        if (obj.hasOwnProperty(key))
            mp.set(kFunc(key), obj[key]);
    return mp;
}
export function untranslate(n) {
    for (const [key, value] of translations) {
        if (value === n)
            return key;
    }
}
export function accepts(token) {
    return translations.has(token) && translations.get(token) < gotoStart;
}
export const defaults = {};
class ParsingError extends Error {
    constructor(parsing, message = '') {
        super();
        const [type] = this.constructor.name.split('$');
        this.type = type;
        this.message = `${ this.type }: ${ message }`;
        this.parsing = parsing;
        this.loc = parsing.lastPosition;
    }
}
class UnexpectedTokenError extends ParsingError {
    constructor(parsing, token, message = `Unexpected "${ token.type }" token`) {
        super(parsing, message);
        this.loc = parsing._locateToken(token);
        this.token = token;
    }
}
class UnexpectedEndError extends ParsingError {
    constructor(parsing, message = 'Encountered EOF but expected more tokens') {
        super(parsing, message);
    }
}
class InvalidTokenError extends UnexpectedTokenError {
    constructor(parsing, token, message = `Invalid token type: "${ token.type }"`) {
        super(parsing, token, message);
    }
}
export class Parser {
    constructor(options = {}) {
        const {context = {}, tokenTranslator = token => token.value} = options;
        this.context = context;
        this.tokenTranslator = tokenTranslator;
        this.states = [0];
        this.stack = [];
        this.values = [];
        this.positions = [];
        this.onreducestart = null;
        this.onreduceend = null;
        this.lastPosition = {
            row: 1,
            column: 0
        };
        this.settings = { locate: false };
    }
    _state() {
        return this.states[this.states.length - 1];
    }
    _fire(eventType, data) {
        const fn = this[`on${ eventType }`];
        const internal = true;
        if (typeof fn === 'function') {
            fn.apply(this, [
                data,
                internal
            ]);
        }
    }
    _locate(positions) {
        if (positions.length === 0) {
            return freeze({
                start: this.lastPosition,
                end: this.lastPosition
            });
        } else {
            const {start} = positions[0];
            const {end} = positions[positions.length - 1];
            return freeze({
                start,
                end
            });
        }
    }
    _locateToken(token) {
        if (token.loc == null) {
            return freeze({
                start: this.lastPosition,
                end: this.lastPosition
            });
        } else {
            return token.loc;
        }
    }
    _reduce(rule) {
        ;
        const [symbol, length] = productions[rule];
        const nodes = this.values.splice(-length || this.values.length);
        const positions = this.positions.splice(-length || this.positions.length);
        const loc = this._locate(positions);
        this._fire('reducestart', {
            rule,
            nodes,
            positions,
            loc
        });
        if (reducers.has(rule)) {
            const fn = reducers.get(rule);
            this.values.push(fn.apply(this.context, [
                nodes,
                loc,
                rule
            ]));
        } else {
            this.values.push(nodes.length > 0 ? nodes[0] : []);
        }
        this._fire('reduceend', {
            loc,
            rule,
            nodes,
            positions,
            node: this.values.length > 0 ? this.values[this.values.length - 1] : null
        });
        this.states.splice(-length || this.states.length);
        this.states.push(lrTable.goto.get(`${ this._state() }-${ symbol }`));
        this.stack.splice(-length || this.stack.length);
        this.stack.push(symbol);
        this.positions.push(loc);
    }
    addSource(txt) {
        this.source += txt;
    }
    push(token, logger = null) {
        if (!translations.has(token.type) || translations.get(token.type) >= gotoStart)
            throw new InvalidTokenError(this, token);
        else {
            const type = translations.get(token.type);
            while (true) {
                const key = `${ this._state() }-${ type }`;
                if (lrTable.action.has(key)) {
                    const val = lrTable.action.get(key);
                    const action = val[0];
                    const number = parseInt(val.slice(1));
                    if (action === 's') {
                        const loc = this._locateToken(token);
                        this.states.push(number);
                        this.stack.push(type);
                        this.values.push(this.tokenTranslator(token));
                        this.positions.push(loc);
                        this.lastPosition = loc.end;
                        return;
                    }
                    if (action === 'r') {
                        this._reduce(number);
                        continue;
                    }
                } else {
                    throw new UnexpectedTokenError(this, token);
                }
            }
        }
    }
    finish(logger = null) {
        const type = translations.get('$');
        while (true) {
            const key = `${ this._state() }-${ type }`;
            if (lrTable.action.has(key)) {
                const val = lrTable.action.get(key);
                const action = val[0];
                const number = parseInt(val.slice(1));
                if (action !== 'r')
                    throw new UnexpectedEndError(this);
                if (number === 0)
                    return this.values[0];
                else {
                    this._reduce(number);
                    continue;
                }
            } else {
                throw new UnexpectedEndError(this);
            }
        }
    }
}
