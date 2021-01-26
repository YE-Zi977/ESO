// vue.config.js
let path = require('path');
let stylePath = path.resolve(__dirname, './static/css/theme.less')
module.exports = {
	css: {
		loaderOptions: {
			less: {
				globalVars: {
					"hack": `true; @import "${stylePath}"`
				}
			}
		}
	}
}
