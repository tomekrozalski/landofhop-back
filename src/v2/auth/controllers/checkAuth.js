const checkAuth = (req, res) => {
	res.status(200).json({ success: true });
};

export default checkAuth;
