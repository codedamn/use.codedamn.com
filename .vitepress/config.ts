import { defineConfig } from 'vitepress'

export default defineConfig({
	lang: 'en-US',
	title: 'Codedamn Docs',
	description: 'Build interactive coding courses on codedamn',

	themeConfig: {
		sidebar: [
			{
				text: 'Getting Started',
				collapsed: false,
				items: [
					{
						text: 'Why interactive?',
						link: '/docs/why-interactive'
					},
					{
						text: 'Create an instructor account',
						link: '/docs/create-account'
					},
					{
						text: 'Setup a course',
						link: '/docs/setup-course'
					},
					{
						text: 'Crash course [Important]',
						link: '/docs/crash-course'
					}
				]
			},
			{
				text: 'Playground Concepts',
				collapsed: false,
				items: [
					{
						text: '.cdmrc file',
						link: '/docs/concepts/cdmrc'
					},
					{
						text: 'Environment Variables',
						link: '/docs/concepts/environment-variables'
					},
					{
						text: 'Port Mapping',
						link: '/docs/concepts/port-mapping'
					}
				]
			},
			{
				text: 'Course Item Guides',
				collapsed: false,
				items: [
					{
						text: 'Playgrounds in Article',
						link: '/docs/instructor-guides/playground-in-article'
					},
					{
						text: 'Regular Quiz',
						link: '/docs/instructor-guides/add-quiz'
					},
					{
						text: 'Quiz in Labs',
						link: '/docs/instructor-guides/quiz-mode-in-lab'
					},
					{
						text: 'Video in Labs',
						link: '/docs/instructor-guides/video-mode-in-lab'
					},
					{
						text: 'I/O Testing Labs',
						link: '/docs/instructor-guides/io-testing'
					},
					{
						text: 'Exam courses',
						link: '/docs/instructor-guides/exam-courses'
					},
					{
						text: 'Pre-sale courses',
						link: '/docs/instructor-guides/presale-course'
					}
				]
			},
			{
				text: 'All Technologies',
				collapsed: false,
				items: [
					{
						text: 'Introduction',
						link: '/docs/technologies/'
					},
					{
						text: 'HTML/CSS',
						link: '/docs/technologies/html-css'
					},
					{
						text: 'React.js',
						link: '/docs/technologies/react'
					},
					{
						text: 'Vue.js',
						link: '/docs/technologies/vue'
					},
					{
						text: 'Node.js',
						link: '/docs/technologies/node'
					},
					{
						text: 'Python',
						link: '/docs/technologies/python-pytest'
					},
					{
						text: 'SQL (SQLite)',
						link: '/docs/technologies/sqlite'
					},
					{
						text: 'Go',
						link: '/docs/technologies/go'
					},
					{
						text: 'Solidity',
						link: '/docs/technologies/solidity-hardhat'
					},
					{
						text: 'Java',
						link: '/docs/technologies/java-junit'
					},
					{
						text: 'AWS Labs',
						link: '/docs/technologies/aws'
					}
				]
			}
		],

		socialLinks: [{ icon: 'discord', link: 'https://cdm.sh/creator-discord' }],

		siteTitle: 'Codedamn Docs',
		logo: '/favicons/ms-icon-310x310.png',

		footer: {
			copyright: `Copyright © codedamn ${new Date().getFullYear()}. All rights reserved.`
		},

		editLink: {
			pattern: 'https://github.com/codedamn/teach.codedamn.com/edit/main/:path',
			text: 'Edit this page on GitHub'
		},

		search: {
			provider: 'local'
		}
	},

	markdown: {
		lineNumbers: true
	},

	lastUpdated: true,

	cleanUrls: true,

	head: [
		[
			'link',
			{
				rel: 'apple-touch-icon',
				sizes: '180x180',
				href: '/favicons/apple-icon-180x180.png'
			}
		],
		[
			'link',
			{
				rel: 'icon',
				type: 'image/png',
				sizes: '32x32',
				href: '/favicons/favicon-32x32.png'
			}
		],
		[
			'link',
			{
				rel: 'icon',
				type: 'image/png',
				sizes: '16x16',
				href: '/favicons/favicon-16x16.png'
			}
		],
		['link', { rel: 'manifest', href: '/favicons/manifest.json' }],
		['link', { rel: 'shortcut icon', href: '/favicons/favicon.ico' }],
		['meta', { name: 'msapplication-TileColor', content: '#ffffff' }],
		['meta', { name: 'msapplication-config', content: '/favicons/browserconfig.xml' }],
		['meta', { name: 'theme-color', content: '#ffffff' }]
	]
})
