require('whatwg-fetch');
require('@testing-library/jest-dom');

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([
        {
            id: 1,
            name: "Test Branch name",
            manager: "Test Manager",
            address: "Test",
            phone: "09090788490",
            lat: 0,
            lng: 0,
            status: true
        }
    ]),
  })
);