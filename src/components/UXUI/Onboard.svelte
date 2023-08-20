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
  import { appwriteAccount, appwriteFunctions } from "@c/appwrite/appwrite";

  let loading = false;
  let renderIMG = false;
  let mounted = false;
  let taskLoad = false;
  let skeleton: any;

  // STAGE
  let stage:  "wish" | "light" | "auto" = 'wish';

  let task = "";
  let data = "";
  let virtualEngine: any;
  let finalLogo = "";

  const dispatch = createEventDispatcher();

  const TaskData = async (url: string) => {};

  const handleWish = () => {
    console.log('wish')
    notification("Running");
    if (ValidTask()) _handleTask();
  };

  const ValidTask = () => {
    if (data.length < 1) {
      notification("Data needs to be longer!");
      return false;
    } else if (task.length < 4) {
      notification("Task needs to be longer!");
      return false;
    } else {
      return true;
    }
  };

  const _handleTask = async () => {
    try {
      loading = true;
      renderIMG = true;
      virtualEngine = JSON.stringify({ businessName: data });

      const res = await appwriteFunctions.createExecution(task, virtualEngine);

      if (res.status === "failed") {
        throw new Error("Internal Error. Try again later.");
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
        //console.log(res.response);
        //notification(`Final Loaded ${res.response}`);
        notification("Image Loaded");
        finalLogo = res.response;
      }
    } catch (error) {
      if (error instanceof Error) {
        log(error.message);
        notification(error.message);
      }
    } finally {
      loading = false;
    }
  };

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
    >
      
    </div>
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
        {#if stage == 'wish'}
        <div>
            <h1 class="text-5xl font-extrabold dark:text-gray-50">
          Zero to Hero Business Generation
        </h1>
        <p class="my-8">
          <span class="font-medium dark:text-gray-50"
            > <span class="gradient-text">Atlas</span> provides you with everything required for going from idea to
            finished product!</span> <br />

          "Dream It. Deploy It. We transform ideas into enterprises."
        </p>
        <form action="#" class="self-stretch space-y-3"  on:submit|preventDefault={handleWish}>
          <div>
            <label for="name" class="text-sm sr-only">Your name</label>
            <input
              id="name"
              type="text"
              placeholder="Your name"
              class="w-full rounded-md focus:ring focus:ri dark:border-gray-700"
            />
          </div>
          <div>
            <label for="lastname" class="text-sm sr-only">Email address</label>
            <input
              id="lastname"
              type="text"
              placeholder="Email address"
              class="w-full rounded-md focus:ring focus:ri dark:border-gray-700"
            />
          </div>
          <button
          class="text-black bg-cyan-200 hover:bg-cyan-700 hover:text-white focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm p-3 mr-2 focus:outline-none"
          type="button">
          Join the waitlist
        </button>
          
        </form>
      </div>
      {:else if stage == 'light'}
        <div>
            Next Stage
        </div>
      {/if}
    </div>

      <img
      src="https://source.unsplash.com/random/480x360"
      alt=""
      class="object-cover w-full rounded-md xl:col-span-3"
    />
    </div>
  </section>
</WidgetWrapper>
