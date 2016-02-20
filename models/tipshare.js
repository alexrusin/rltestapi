module.exports = function(sequelize, DataTypes) {
	return sequelize.define('tipshare', {
		title: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [1, 250]
			}
		},
		author: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [1, 250]
			}
		},
		article: {
			type: DataTypes.TEXT,
			allowNull: false,
			
		},
		active: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false
		}

	});
};