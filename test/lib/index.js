const lib = require('../../lib');
const chai = require('chai');

const should = chai.should();
const expect = chai.expect;

describe('makeCalculator', () => {
    describe('with max which equal zero', () => {
        it('should through exception', () => {
            expect(function() {
                lib.makeCalculator({
                    max: 0,
                    current: 1,
                    level: 1
                });
            }).to.be.throw('Cannot change brightness of device with max level equal 0')
        });
    });

    describe('normal parameters', () => {
        it('should iterate parameter in loop', () => {
            const getLevel = lib.makeCalculator({
                max: 100,
                current: 50,
                level: 50
            });

            getLevel().should.be.equal(100);
            getLevel().should.be.equal(50);
            getLevel().should.be.equal(0);
            getLevel().should.be.equal(50);
            getLevel().should.be.equal(100);
        });
    });
});
