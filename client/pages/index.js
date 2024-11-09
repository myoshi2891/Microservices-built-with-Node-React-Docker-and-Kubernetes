const LandingPage = ({ color }) => {
	console.log("from component", color);

	return <h1>Landing Page!!</h1>;
};

LandingPage.getInitialProps = () => {
	console.log("from the server");

	return { color: "red" };
};

export default LandingPage;
