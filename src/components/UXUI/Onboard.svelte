<script lang="ts" context="module">
  declare global {
    interface Window {}
  }
</script>

<script lang="ts">
  //Svelte
  import { onMount, onDestroy, createEventDispatcher } from "svelte";
  import WidgetWrapper from "./WidgetWrapper.svelte";

  import { kbve$, log, notification$, notification } from "@c/appwrite/storage";
  import {
    appwriteAccount,
    appwriteFunctions,
    appwriteDatabases,
    create,
    isLoggedIn,
    getProfile,
  } from "@c/appwrite/appwrite";

  import { Query } from "appwrite";

  let loading = false;
  let renderIMG = false;
  let mounted = false;
  let taskLoad = false;
  let skeleton: any;

  // WISH
  let name = "";
  let email = "";
  let password = "";
  let confirm = "";

  // BIZ
  let businessName = "";
  let businessIdea = "";

  // Profile

  let username = "";
  let legalName = name;

  //
  let virtualEngine: any;


  let usernameRegex = new RegExp(/^[a-z0-9]+$/i);



  const handleOnboard = () => {
    notification("Starting Onboard...!");
    if(ValidInput()) handleRegister();
  };

  const ValidInput = () => {
    if (password.length < 8) {
      notification("Password has to be 8 or more characters");
      //reset();
      return false;
    } else if (username.length < 8) {
      notification('Username has to be 8 or more characters');
      return false;
    } else if (!usernameRegex.test(username)) {
			notification('Username has to be alpha-numeric a-Z and 0-9 only ');
			return false;
		} else if (confirm != password) {
			notification('passwords do not match');
			return false;
    } else if (businessIdea.length < 10) {
			notification('business idea was too short!');
			return false;
    } else if (businessName.length < 5) {
			notification('business name is too short!');
			return false;
		} else if (password.length < 8) {
			notification('password has to be at least 8 characters or stronger ');
			return false;
		} else {
      return true;
    }
  };

  const handleRegister = async () => {

  }

 

  // Handle Onboard [END]



  //! [LIB]
  

  const dispatch = createEventDispatcher();


  const dismiss = async () => {
    notification("");
  };

  onMount(() => {
    mounted = true;
  });

  onDestroy(() => {
    //mounted = false;
  });

  $: if (mounted && !taskLoad) {
    //TaskData();
    skeleton = window.document.getElementById("skeleton") as HTMLElement;
    if (skeleton) skeleton.remove();
  }



</script>

<WidgetWrapper background="https://kbve.com/assets/img/curved-images/wave.jpg">
  <section class="p-6 dark:bg-gray-800 dark:text-gray-100">
    <div
      class="container grid gap-6 mx-auto text-center lg:grid-cols-2 xl:grid-cols-5"
    >
      <div class="w-full px-6 py-16 rounded-md sm:px-12 md:px-16 xl:col-span-2">
        
        <!-- Notification - [START] -->

        <div class="min-h-[100px]">
          {#if $notification$}
            <h1>
              <div
                id="toast-default"
                class="flex items-center w-full max-w-xs p-4 bg-offset rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
                role="alert"
              >
                <div
                  class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-blue-500 bg-blue-100 rounded-lg dark:bg-blue-800 dark:text-blue-200"
                >
                  <svg
                    class="w-4 h-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 20"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15.147 15.085a7.159 7.159 0 0 1-6.189 3.307A6.713 6.713 0 0 1 3.1 15.444c-2.679-4.513.287-8.737.888-9.548A4.373 4.373 0 0 0 5 1.608c1.287.953 6.445 3.218 5.537 10.5 1.5-1.122 2.706-3.01 2.853-6.14 1.433 1.049 3.993 5.395 1.757 9.117Z"
                    />
                  </svg>
                  <span class="sr-only">Fire icon</span>
                </div>
                <div class="ml-3 text-sm font-normal capitalize">
                  {$notification$}
                </div>
                <button
                  type="button"
                  class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                  data-dismiss-target="#toast-default"
                  aria-label="Close"
                  on:click={dismiss}
                >
                  <span class="sr-only">Close</span>
                  <svg
                    class="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                </button>
              </div>
            </h1>
          {:else}
            <span
              class="font-bold leading-tight tracking-tight gradient-text text-2xl"
            >
              "From Vision to Venture: Your Idea, Incorporated."
            </span>
          {/if}
        </div>
        <!-- Notification End-->
        
        <div>
            <p class="my-8">
              <span class="font-medium dark:text-gray-50">
                <span class="gradient-text">BizOps</span> Let us begin the business
                onboarding! What is your legal name and business entity?</span
              >
            </p>
            <form
              action="#"
              class="self-stretch space-y-3"
              on:submit|preventDefault={handleOnboard}
            >
              <div>
                <label for="name" class="text-sm sr-only"
                  >Your Legal Name</label
                >
                <input
                  id="name"
                  type="text"
                  placeholder="Your Legal Name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required
                  bind:value={name}
                />
              </div>
              <div>
                <label for="username" class="text-sm sr-only"
                  >Public Username</label
                >
                <input
                  id="username"
                  type="text"
                  placeholder="Public Username"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required
                  bind:value={username}
                />
              </div>
              <div>
                <label for="email" class="text-sm sr-only">Email address</label>
                <input
                  id="email"
                  type="email"
                  placeholder="Email address"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  bind:value={email}
                />
              </div>
              <div>
                <label for="password" class="text-sm sr-only">Password</label>
                <input
                  id="password"
                  type="password"
                  placeholder="Password"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  bind:value={password}
                />
              </div>

              <div>
                <label for="confirm" class="text-sm sr-only">Confirm Password</label>
                <input
                  id="confirm"
                  type="password"
                  placeholder="Confirm Password"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  bind:value={confirm}
                />
              </div>
              <div class="divide-y divide-dashed hover:divide-solid divide-secondary">
                <div>BizOps.</div>
              </div>
              <div>
                <label for="businessName" class="text-sm sr-only">Your Business Legal Name</label>
                <input
                  id="businessName"
                  type="text"
                  placeholder="Your Legal Business Name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  bind:value={businessName}
                />
              </div>
              <div>
                <label for="confirm" class="text-sm sr-only">Your Business Idea!</label>
                <input
                  id="businessIdea"
                  type="textarea"
                  placeholder="Your crazy business idea!"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  bind:value={businessIdea}
                />
              </div>

              <button
                type="submit"
                class="text-black bg-cyan-200 hover:bg-cyan-700 hover:text-white focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm p-3 mr-2 focus:outline-none"
              >
                Join the Atlas
              </button>
            </form>
          </div>
        
      </div>

      <div>
        <img
          src="https://images.unsplash.com/photo-1580287654793-998b9abbbeaa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1694&q=80"
          alt=""
          class="object-cover w-full rounded-2xl xl:col-span-3"
        />
        <br />
        <span class="gradient-text">
          "Dream It. Deploy It. We transform ideas into enterprises."</span
        >
      </div>
    </div>
  </section>
</WidgetWrapper>
