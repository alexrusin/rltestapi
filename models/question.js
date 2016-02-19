module.exports = function(sequelize, DataTypes) {
	return sequelize.define('question', {
		text: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		feedback: {
			type: DataTypes.TEXT,
			allowNull: true,
			defaultValue: null
		}
	});

};