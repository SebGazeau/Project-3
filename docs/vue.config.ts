import * as path from 'path'
import { ProjectOptions } from "@vue/cli-service"
const conf: ProjectOptions = {
	publicPath: process.env.BASE_URL || "/",
    chainWebpack: config => {
        config.resolve
        .alias
        .set('@public', path.resolve(__dirname, 'src/module/public/'));
    },
	configureWebpack: {
        devtool: 'source-map',
    },
    productionSourceMap: false
};
module.exports = conf
