# TypeScript
vue.json配置信息,直接复制粘贴就好
`
{
	"Vue Template":{
		"prefix":"vueTemplate",
		"body":[
			"<template>\n\t<div>\n\n\t</div>\n</template>\n\n",
			"<script lang=\"ts\">\nimport{Component,Vue}from 'vue-property-decorator';\n\n@Component\nexport default class ${1:ClassName} extends Vue{\n$0\n}\n</script>\n\n",
			"<style lang=\"stylus\" scope>\n\n</style>"
		],
		"description":"生成vue文件"
	}
}
`
----
###### 同级文件中是一些TS基本语法，以及使用的场景
        
### clone本地后，运行项目`npm run serve`