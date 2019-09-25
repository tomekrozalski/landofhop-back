import Ingredient from '../ingredient.model';

const saveOne = (req, res) => {
	const ingredient = new Ingredient(req.body);

	ingredient
		.save()
		.then((result) => {
			res
				.status(200)
				.json(result);
		})
		.catch(() => {
			res
				.status(500)
				.json({ message: 'An error occured' });
		});
};

export default saveOne;
