<script lang="ts" context="module">
  declare global {
    interface Window {}
  }
</script>

<script lang="ts">
  //Svelte
  import { onMount, onDestroy, createEventDispatcher } from "svelte";
  import WidgetWrapper from "@c/UXUI/WidgetWrapper.svelte";

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

  // STAGE
  let stage: "wish" | "light" | "biz" | "profile" | "auto" = "wish";

  // WISH
  let name = "";
  let email = "";
  let password = "";

  // BIZ

  let businessName = "";
  let businessIdea = "";

  // Profile

  let username = "";
  let legalName = "";

  //

  let task = "";
  let data = "";
  let virtualEngine: any;
  let finalLogo = "";
  let profileData: any = "";

  const dispatch = createEventDispatcher();

  const TaskData = async (url: string) => {};

  // Handle Profile [START]

  const ValidProfile = () => {
    if (username.length < 8) {
      notification("Username has to be 8 or more characters");
      return false;
    } else if (legalName.length < 3) {
      notification("Legal Name has to be longer!");
      return false;
    } else {
      return true;
    }
  };

  const handleProfile = () => {
    notification("Handling Profile...");
    if (ValidProfile()) _handleProfile();
  };

  const _handleProfile = async () => {
    notification("Handling Profile!..");

    try {
      loading = true;
      virtualEngine = JSON.stringify({
        username: username,
        legalName: legalName,
      });
      // Function 64e1bce0550744f5d108
      const res = await appwriteFunctions.createExecution(
        "64e1bce0550744f5d108",
        virtualEngine
      );
      if (res.status === "failed") {
        notification(`${res.response}`);
        throw new Error("Try again");
      }
      if (res.statusCode === 400)
      {
        notification(`${res.response}`);
        if(res.response.toString().includes('Already Have?! Loading..'))
        {
          stage = 'biz';
        }
        //throw new Error(`${res.response}`)
       
      }

      if (res.response) {
        /*
              const json = JSON.parse(res.response);
              if (json.success === false) {
                  throw new Error(json.msg);
              }
              else 
              {
                notification(JSON.stringify(json));
              }
              */
        console.log(res.response);
        //notification(`Final Loaded ${res.response}`);
        try { 

          let _p = await getProfile();
          if(_p) {
            notification("Profile Loaded");
            stage = 'biz';
          }
          else
          {
            notification("Profile Failed");
          }
        }
        catch (error)
        {
          
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        log(error.message);
        notification(error.message);
      }
    } finally {
      loading = false;
    }
  };



  // Handle Profile [END]

  // Handle Biz [START]

  const handleBiz = () => {
    notification("Building Biz Ops...");
    handleBizOps();
  };

  const handleBizOps = () => {};

  // Handle Biz [END]

  // Handle Wish [START]
  const handleWish = () => {
    notification("Registering...");
    handleRegister();
  };

  const ValidInput = () => {
    if (password.length < 8) {
      notification("password has to be 8 or more characters");
      //reset();
      return false;
    } else {
      return true;
    }
  };

  const handleRegister = async () => {
    if (ValidInput()) _handleRegister();
  };

  const _handleRegister = async () => {
    try {
      loading = true;
      await create(email, password, name);
      notification("Thanks! Whats the business name and idea?");
      stage = "biz";
    } catch (error) {
      if (error instanceof Error) {
        log(error.message);
        notification(error.message);
      }
    } finally {
      loading = false;
    }
  };

  // Handle Wish [END]


  

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
  <selection id="onboard">
    <div
      class="flex flex-col space-y-4 items-center justify-center md:space-y-1 md:space-x-6 md:flex-row"
    />
  </selection>
</WidgetWrapper>

<br />

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
        {#if stage == "wish"}
          <div>
            <p class="my-8">
              <span class="font-medium dark:text-gray-50">
                <span class="gradient-text">Atlas</span> provides you with everything
                required for going from idea to finished product!</span
              >
            </p>
            <form
              action="#"
              class="self-stretch space-y-3"
              on:submit|preventDefault={handleWish}
            >
              <div>
                <label for="name" class="text-sm sr-only">Your name</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required
                  bind:value={name}
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
                  placeholder="******"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  bind:value={password}
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

          <!-- START Profile -->
        {:else if stage == "profile"}
          <div>
            <p class="my-8">
              <span class="font-medium dark:text-gray-50">
                <span class="gradient-text">Profile</span> We need to create you
                a legal profile!</span
              >
            </p>
            <form
              action="#"
              class="self-stretch space-y-3"
              on:submit|preventDefault={handleProfile}
            >
              <div>
                <label for="name" class="text-sm sr-only">Legal Full Name</label
                >
                <input
                  id="legalName"
                  type="text"
                  placeholder="Legal Full Name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required
                  bind:value={legalName}
                />
              </div>
              <div>
                <label for="email" class="text-sm sr-only"
                  >Public Username</label
                >
                <input
                  id="username"
                  type="text"
                  placeholder="Public Username"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  bind:value={username}
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

          <!-- START Biz OPS -->
        {:else if stage == "biz"}
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
              on:submit|preventDefault={handleBiz}
            >
              <div>
                <label for="name" class="text-sm sr-only"
                  >Legal First Name</label
                >
                <input
                  id="name"
                  type="text"
                  placeholder="Legal First name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required
                  bind:value={name}
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
                  placeholder="******"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  bind:value={password}
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
        {/if}
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
