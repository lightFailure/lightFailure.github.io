class LSystem {
    constructor(data, iterations) {
        this.rules = data.rules;
        this.axiom = data.axiom;
        this.iterations = iterations;
        this.angle = data.angle;
    }

    generate() {
        let current = this.axiom;

        for (let i = 0; i < this.iterations; i++) {
            let next = '';

            for (const char of current) {
                const rule = this.rules.find(r => r.predecessor === char);
                if (rule) {
                    const totalProbability = rule.successors.reduce((sum, succ) => sum + succ.probability, 0);
                    let random = Math.random() * totalProbability;
                    for (const successor of rule.successors) {
                        random -= successor.probability;
                        if (random <= 0) {
                            next += successor.rule;
                            break;
                        }
                    }
                } else {
                    next += char;
                }
            }

            current = next;
        }

        let finalResult = '';
        const instructionalChars = ['F', '+', '-', '&', '^', '<', '>', '[', ']', 'L'];
        for (const char of current) {
            if (instructionalChars.includes(char)) {
                finalResult += char;
            } else {
                finalResult += 'L';
            }
        }

        return finalResult;
    }
}
// Export the LSystem class for usage in the HTML environment.
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LSystem;
}
