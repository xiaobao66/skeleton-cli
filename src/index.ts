import yargs from 'yargs';
import inquirer from 'inquirer';
import chalk from 'chalk';
import shelljs from 'shelljs';
import path from 'path';
import { ACTION_TYPES, TEMPLATE_TYPES, TEMPLATE_URLS } from './constants';
import { readFile, writeFile } from './utils';

class Creator {
  init(): void {
    const { argv } = yargs.alias({
      v: 'version',
    });

    // 获取动作
    const [action, project] = argv._;

    if (action === ACTION_TYPES.CREATE) {
      this.create(project);
    }
  }

  async create(project: string): Promise<void> {
    if (!project) {
      throw new Error("please input a project's name");
    }

    // 用户交互
    const answers = await inquirer.prompt([
      // 模板类型
      {
        type: 'rawlist',
        name: 'templateType',
        message: '请选择模板类型',
        choices: Object.keys(TEMPLATE_TYPES).map((key) => {
          const name = TEMPLATE_TYPES[key].toLowerCase();
          return {
            name,
            value: key,
            short: name,
          };
        }),
        default: TEMPLATE_TYPES.REACT_TS,
      },
    ]);

    const { templateType } = answers;
    const gitUrl = TEMPLATE_URLS[templateType];

    if (!shelljs.which('git')) {
      throw new Error('本机未安装git');
    }
    // 校验是否存在同名项目
    const files = shelljs.ls();
    if (files.some((file) => file === project)) {
      throw new Error(`当前目录已存在${project}`);
    }
    try {
      // 下载模板
      console.info(chalk.green('模板下载中...'));
      shelljs.exec(`git clone ${gitUrl} ${project}`);
      // 删除.git等多余文件
      shelljs.cd(project);
      shelljs.rm('-rf', '.git', 'knowledge.md');
      shelljs.cd('..');
      // 修改package.json
      let filePath = path.join(process.cwd(), `${project}/package.json`);
      let content = JSON.parse(await readFile(filePath));
      await writeFile(
        filePath,
        JSON.stringify(
          { ...content, name: project, version: '1.0.0', author: '' },
          null,
          2,
        ),
      );
      // 修改npm-shrinkwrap.json
      filePath = path.join(process.cwd(), `${project}/npm-shrinkwrap.json`);
      content = JSON.parse(await readFile(filePath));
      await writeFile(
        filePath,
        JSON.stringify(
          { ...content, name: project, version: '1.0.0' },
          null,
          2,
        ),
      );
      console.info(chalk.green(`${project}创建成功!`));
    } catch (e) {
      shelljs.rm('-rf', project);
      console.error(chalk.red(e.message));
    }
  }
}

export default Creator;
