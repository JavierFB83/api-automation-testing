import { isNumber, isString } from './commonMethods';

describe('use GET method to get data from typicode', () => {
  it('visit url and get data from typicode', () => {
    cy.visit('/'); //con visit url
    cy.request({
      method: 'GET',
      url: '/posts'
    });
  });

  it('visit url and get data from typicode', () => {
    cy.request({
      method: 'GET',
      url: '/posts' //sin hacer visit solo haciendo get sobre la url y declarando los parametros
    });
  });

  it('visit url and get data from typicode', () => {
    cy.request('GET', '/posts'); //sin necesidad de declarar los parametros ( se puede declarar de esta manera tanto el GET y DELETE q son parametros que no tienes q enviar nada en el body)
  });

  it('get data from typicode and get status code', () => {
    cy.request('GET', '/posts').then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it('get data from typicode and its status code', () => {
    cy.request('GET', '/posts').its('status').should('eq', 200);
  });

  it('get data from typicode and its response body length ', () => {
    cy.request('GET', '/posts').its('body').should('have.length', 100);
  });

  it('get data from typicode and use should on the response and validate status code and length of response body ', () => {
    cy.request('GET', '/posts').should((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.length(100);
    });
  });

  it('get data from typicode and use should on the response, validate status code, length and type of response', () => {
    cy.request('GET', '/posts').should((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.length(100);
      expect(response.body).to.be.a('array');
      expect(response.body).to.not.to.be.a('number');
    });
  });

  it('get data from a typicode/post/1 and check its status code', () => {
    cy.request('/posts/1').its('status').should('eq', 200);
  });

  it('get data from a typicode/post1, check its status code, type of response body and evaluates type of value', () => {
    cy.request('/posts/1').should((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.a('object');
      Object.values(response.body).forEach((value) => {
        expect(isNumber(value) || isString(value)).to.be.true;
      });
      expect(response.body['title']).to.eq(
        'sunt aut facere repellat provident occaecati excepturi optio reprehenderit'
      );
      expect(response.body['userId']).to.eq(1);
      expect(response.body['body']).to.eq(
        'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto'
      );
    });
  });

  it('get data from a typicode/post1/comments, check its status code, type of response body and assert over object with id 4', () => {
    cy.request('/posts/1/comments').should((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.a('array');
      expect(response.body).to.have.length(5);
      response.body.filter((comment) => {
        comment.id === 4 && expect(comment.email).to.eq('Lew@alysha.tv');
      });
    });
  });

  it('a 404 error is displayed when getting data from typicode/post1/comment', () => {
    cy.request({
      url: '/posts/1/comment',
      failOnStatusCode: false
    }).should((response) => {
      expect(response.status).to.eq(404);
    });
  });
});
