import axios from "axios";

const buildClient = ({ req }) => {
	if (typeof window === "undefined") {
		return axios.create({
			baseURL:
				"http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
			headers: req.headers,
		});

		//  return axios.create({
		// 		baseURL: "your_purchased_domain",
		// 		headers: req.headers,
		// 	});
	} else {
		return axios.create({
			baseURL: "/",
		});
	}
};

export default buildClient;
