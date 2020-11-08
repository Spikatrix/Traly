# Traly &nbsp; [![License: GPL v3](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

<img src="https://i.stack.imgur.com/EMwIg.png" alt="Traly Icon" width="150px" align="left" style="margin: 10px 20px 10px 10px; border-radius: 15%; box-shadow: 0 6px 20px 2px black">

<br/>
<br/>

Traly helps you to add translations to LRC files

It is available on [GitHub pages][github_page_link]

<br/>
<br/>

## About

Traly is a tool that helps you to add translations to LRC files. This is done by appending every lyric line with `^` along with the translated lines. 

**Note**: Translations to LRC files separated by the `^` character is a non-standard feature and hence is supported in a few applications only.

## Supported applications

 - [Android] Huawei's stock music player

## Build from source

If you wish to build from source, use the following code:

	$ git clone https://github.com/Spikatrix/Traly
	$ cd Traly
	$ yarn install   # Installs all dependencies
	$ yarn run dev   # Serves the Vue.js app in localhost

## Contributing

Traly is a FOSS tool developed by [me](https://github.com/Spikatrix) using Vue.js. Contributions are always welcome.

## License

This project is licensed under the [GNU GPLv3 License][project_license]

<!-- Link references -->
[github_page_link]: https://spikatrix.github.io/Traly
[project_license]: https://github.com/Spikatrix/Traly/blob/master/LICENSE
