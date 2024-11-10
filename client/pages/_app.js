import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import buildClient from "../api/build-client";
const AppComponent = ({ Component, pageProps }) => {
	return (
		<div>
			<h1>Header</h1>
			<Component {...pageProps} />
		</div>
	);
};

AppComponent.getInitialProps = () => {};

export default AppComponent;