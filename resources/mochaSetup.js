
import chai from 'chai';
import chaiSubSet from 'chai-subset';
import sinonChai from 'sinon-chai';

chai.use(sinonChai);
chai.use(chaiSubSet);

global.expect = chai.expect;
