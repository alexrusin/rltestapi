module.exports = function(sequelize, DataTypes) {
	return sequelize.define('answer', {
		text: DataTypes.TEXT,
		correct: {
			type: DataTypes.BOOLEAN,
			defaultValue: false
		}
	});
};