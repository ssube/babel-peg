export class ASTNode {
    evaluate() {
        throw new Error("Unknown node type.");
    }

    toString() {
        return JSON.stringify(this);
    }
}

export class ASTPrimitive extends ASTNode {
    constructor(value) {
        this.value = value;
    }

    evaluate() {
        return this.value;
    }

    toString() {
        return this.value;
    }
}

export class BinaryNode extends ASTNode {
    constructor(args) {
        this.lh = args.lh;
        this.op = args.op;
        this.rh = args.rh;
    }

    evaluate() {
        let lho = this.lh.evaluate(), rho = this.rh.evaluate();
        switch (this.op) {
            case "+": return this.lh._add ? this.lh._add(lho, rho) : lho + rho;
            case "-": return this.lh._sub ? this.lh._sub(lho, rho) : lho - rho;
            case "/": return this.lh._div ? this.lh._div(lho, rho) : lho / rho;
            case "*": return this.lh._mul ? this.lh._mul(lho, rho) : lho * rho;
            default: throw new Error("Unknown operator.");
        }
    }
}

export class UnaryNode extends ASTNode {
    constructor(args) {
        this.op = args.op;
        this.bh = args.bh;
    }

    evaluate() {
        let bho = this.bh.evaluate();
        switch (this.op) {
            case "--": return --bho;
            case "++": return ++bho;
            case "-": return -bho;
            case "+": return +bho;
            default: throw new Error("Unknown operator.");
        }
    }
}

export class NumericPrim extends ASTPrimitive {
    constructor(args) {
        super(parseInt(args.value, 10));
    }
}

export class SpecialPrim extends NumericPrim {
    _add(lho, rho) {
        return lho - rho;
    }

    _sub(lho, rho) {
        return lho + rho;
    }
}
