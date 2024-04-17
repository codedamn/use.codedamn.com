# How to create an interactive Vue.js lab with Vitest?

<!--@include: ./../_components/TechnologyIntro.md-->

We'll divide this part into 5 sections:

1. Creating lab metadata
2. Setting up lab defaults
3. Setting up lab challenges
4. Setting up test file
5. Setting up evaluation script

## Introduction

This guide would assume that you already have created an interactive course from your instructor panel. If not, [go here and set it up first](https://codedamn.com/instructor/interactive-courses)

## Step 1 - Creating lab metadata

<!--@include: ./../_components/LabMetadata.md-->

### Lab Details

Lab details is the tab where you add two important things:

-   Lab title
-   Lab description

Once both of them are filled, it would appear as following:

![](/images/html-css/lab-details.png)

Let's move to the next tab now.

### Lab Layout

<!--@include: ./../_components/LabLayout.md-->

## Step 2 - Lab Defaults

Lab defaults section include how your lab environment boots. It is one of the most important parts because a wrong default environment might confuse your students. Therefore it is important to set it up properly.

When a codedamn playground boots, it can setup a filesystem for user by default. You can specify what the starting files could be, by specifying a git repository and a branch name:

![Lab default repository](/images/vue/lab-default-repo.png)

**Important note:** For Vue playground, we recommend you to fork the following repository and use it as a starter template: [Vue vite playground starter - codedamn](https://github.com/codedamn-projects/vue3-vite-playground)

**Note:** You can setup a Vue project in other ways as well - for example with `create-vue`. However, it is highly recommended to use Vite for Vue because it sets up the project extremely fast for the user to work with.

You will find a `.cdmrc` file in the repository given to you above. It is highly recommend, at this point, that you go through the [.cdmrc guide and how to use .cdmrc in playgrounds](/docs/concepts/cdmrc) to understand what `.cdmrc` file exactly is. Once you understand how to work with `.cdmrc` come back to this area.

## Step 3 - Lab challenges

<!--@include: ./../_components/LabChallenges.md-->

## Step 4 - Test file

Once you save the lab, you will see a button named `Edit Test File` in the `Evaluation` tab. Click on it.

![](/images/common/lab-edit-test.png)

When you click on it, a new window will open. This is a test file area.

You can write anything here. Whatever script you write here, can be executed from the `Test command to run section` inside the evaluation tab we were in earlier.

The point of having a file like this to provide you with a place where you can write your test.

**For Vue.js labs, you can continue with the 'Custom Template' selected by default:**

![](/images/vue/lab-edit-test-file.png)

Paste the following code in the editor as a starting point:

```jsx
import { mount } from '@vue/test-utils'

test('Test 1', async () => {
    try {
        const { default: HelloWorld } = await import('../code/src/components/HelloWorld.vue')

        const wrapper = mount(HelloWorld)

        expect(wrapper.text()).toContain('Hello Vue.js!')
    } catch (e) {
        expect(false).toBe(true)
    }
})
```

Let us understand what is happening here exactly:

-   Remember that we can code anything in this file and then execute it later. In this example, we're writing a Vue.js Vitest test script from scratch. Check out [vitest docs](https://vitest.dev) if you're new to vitest.
-   Remember that we will install vitest and other required utilities in the evaluation script section below. Therefore, you can try to import and use anything and everything here you want.
-   The rest of the code is just importing the default user code, and testing it through standard unit testing procedures.

![](/images/html-css/playground-tests.png)

-   The number of `test(...)` blocks inside your `describe` suite should match the number of challenges added in the creator area.

-   **Note:** If your number of `test` blocks are less than challenges added back in the UI, the "extra" UI challenges would automatically stay as "false". If you add more challenges in test file, the results would be ignored. Therefore, it is **important** that the `results.length` is same as the number of challenges you added in the challenges UI.

-   We then also add jQuery and chai for assisting with testing. Although it is not required as long as you can populate the `results` array properly.

This completes your evaluation script for the lab. Your lab is now almost ready for users.

## Step 5 - Evaluation Script

Evaluation script is actually what runs when the user on the codedamn playground clicks on "Run Tests" button.

![](/images/common/lab-run-tests.png)

Remember that we're using Vue Vite playground setup. This means we can assume that we already have vite installed.

However, we still need to setup a lot of things: `jsdom`, `vitest`, and `@vue/test-utils`. Therefore, we can write our evaluation bash script to install all of this and run our tests. Here's how the Vue vitest script looks like:

```sh
#!/bin/bash
set -e 1

# Assumes you are running a vue vite playground on codedamn

# Install vitest and testing util
cd /home/damner/code
bun add vitest@0.29.7 jsdom@21.1.1 @vue/test-utils@2.3.2 --dev
mkdir -p /home/damner/code/.labtests
 
# Move test file
mv $TEST_FILE_NAME /home/damner/code/.labtests/all.test.js

# vitest config file
cat > /home/damner/code/.labtests/config.js << EOF
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    Vue(),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
  },
})
EOF

# process.js file
cat > /home/damner/code/.labtests/process.js << EOF
import fs from 'fs'
const payload = JSON.parse(fs.readFileSync('./.labtests/payload.json'));
const answers = payload.testResults[0].assertionResults.map(test => test.status === 'passed')
fs.writeFileSync(process.env.UNIT_TEST_OUTPUT_FILE, JSON.stringify(answers))
fs.rmdirSync('./.labtests', { recursive: true, force: true })
EOF

# run test
bun vitest run --config=/home/damner/code/.labtests/config.js --threads=false --reporter=json --outputFile=/home/damner/code/.labtests/payload.json || true

# Write results to UNIT_TEST_OUTPUT_FILE to communicate to frontend
node /home/damner/code/.labtests/process.js
```

You might need to have a little understanding of bash scripting. Let us understand how the evaluation bash script is working:

-   With `set -e 1` we effectively say that the script should stop on any errors
-   We then navigate to user default directory `/home/damner/code` and then install the required NPM packages. Note that this assumes we already have `vite` installed. If you're using a different vue setup (like `create-vue`), you might have to install `vite` as well.
-   You can install additional packages here if you want. They would only be installed the first time user runs the test. On subsequent runs, it can reuse the installed packages (since they are not removed at the end of testing)
-   Then we create a `.labtests` folder inside of the `/home/damner/code` user code directory. Note that `.labtests` is a special folder that can be used to place your test code. This folder will not be visible in the file explorer user sees, and the files placed in this folder are not "backed up to cloud" for user.
-   We move the test file you wrote earlier (in last step) to `/home/damner/code/.labtests/all.test.js`.
-   We then also create a custom vite config file as `config.js`. This is because we don't want to override your (or users') custom `vite.config.js` file if present. This file only loads `jsdom` and marks the `globals: true` hence importing `describe`, `test`, etc. automatically available without importing. More information about the configuration can be found here in [vitest docs](https://vitest.dev/config/#globals).
-   We then create a `process.js` file that can be used to process our results into a single file of boolean values. This is important because on the playground page, the way challenges work, is that they get green or red based on a JSON boolean array written inside the file in environment variable: `$UNIT_TEST_OUTPUT_FILE`
-   For example, once the test run succeeds, and if you write `[true,false,true,true]` inside `$UNIT_TEST_OUTPUT_FILE`, it would reflect as PASS, FAIL, PASS for 3 challenges available inside codedamn playground UI (as shown below)

![](/images/html-css/playground-tests-2.png)

-   Then we run the actual test using `bun vitest run` command, specifying the output as JSON (read by `process.js`) and in a single thread (as we want ordered results).

-   Finally we run the `process.js` file that writes the correct JSON boolean array on `$UNIT_TEST_OUTPUT_FILE` which is then read by the playground UI and marks the lab challenges as pass or fail.

**Note:** You can setup a full testing environment in this block of evaluation script (installing more packages, etc. if you want). However, your bash script test file will be timed out **after 30 seconds**. Therefore, make sure, all of your testing can happen within 30 seconds.

## Setup Verified Solution (Recommended)

<!--@include: ./../_components/LabVerifiedSolution.md-->
