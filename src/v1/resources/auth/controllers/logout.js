const logout = (req, res) => {
	req.session.destroy(() => {
		res.redirect('/');
	});
};

export default logout;
