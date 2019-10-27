import Beverage from 'models/beverage';

const count = (req, res) => {
	Beverage.count({}, (err, value) => {
		res
			.status(200)
			.json(value);
	});
};

export default count;
