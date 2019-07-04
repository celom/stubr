import Stubr from './lib/main';
import { Method } from './lib/main';

const stubr = new Stubr();

stubr.register({
	group: "MyGroup",
	name: "Test",
	route: "/abc",
	method: Method.POST,
	delay: 500,
	validate: (headers: object, body: object) => {
		return true;
	},
	responseCode: 200,
	responseBody: {
		data: "test"
	}
});

stubr.register({
	group: "MyGroup",
	name: "Test 2",
	route: "/abcd",
	method: Method.GET,
	validate: (headers: object, body: object) => {
		return true;
	},
	responseCode: 200,
	responseBody: (headers: object, body: object) => {
		return {
			...body,
			data: "yay, dynamic body"
		}
	}
});

// example for dynamic headers and params
stubr.register({
	group: "MyGroup",
	name: "Test with Params",
	route: "/route-with-params",
	method: Method.GET,
	validate: (headers: object, body: object, params: object) => {
		return params && (params as any).test;
	},
	responseCode: 200,
	responseHeaders: (headers: object, body: object, params: object) => {
		return {
			"X-Test": (params as any).test
		}
	},
	responseBody: (headers: object, body: object, params: object) => {
		return {
			...body,
			data: "yay, dynamic body",
			params: params
		}
	}
});

// example for non json content types
stubr.register({
	group: "MyGroup",
	name: "HTML body",
	route: "/html-response",
	method: Method.GET,
	validate: (headers: object, body: object, params: object) => {
		return true;
	},
	responseCode: 200,
	responseBody: (headers: object, body: object, params: object) => {
		return `
			<html>
				<head></head>
				<body>
					<p>Hello World</p>
				</body>
			</html>
		`
	}
});

stubr.run();
