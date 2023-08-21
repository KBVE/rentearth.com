<script lang="ts" context="module">
  declare global {
    interface Window {}
  }
</script>

<script lang="ts">
  import { onMount, onDestroy, createEventDispatcher } from "svelte";
  import WidgetWrapper from "./WidgetWrapper.svelte";

  import { Query } from 'appwrite';
  import { kbve$, log, notification$, notification, locker } from "@c/appwrite/storage";
  import { __get, appwriteAccount, appwriteFunctions } from "@c/appwrite/appwrite";
  import { type BusinessResponse, type LogoResponse } from "@c/kbve";
  import { AppSettings } from "src/constants";
  import Content from "./Content.svelte";

  let loading = false;
  let renderIMG = false;
  let mounted = false;
  let taskLoad = false;
  let skeleton: any;

  let task = "64dfee82eada6467290f";
  let virtualEngine: any;
  let logo: LogoResponse;
  let pastLogos: LogoResponse[] = [];
  let business: BusinessResponse;

  const dispatch = createEventDispatcher();

  const TaskData = async (url: string) => {};
  const ValidTask = () => {
    if (business.business_name.length < 1) {
      notification("Business name needs to be longer!");
      return false;
    } else if (task.length < 4) {
      notification("Task needs to be longer!");
      return false;
    } else {
      return true;
    }
  };

  const handleTask = () => {
    notification("Running");
    if (ValidTask()) _handleTask();
  };

  const _handleTask = async () => {
    try {
      loading = true;
      renderIMG = true;
      virtualEngine = JSON.stringify({ businessName: business.business_name, businessId: business.$id });
      console.log(virtualEngine);
      const res = await appwriteFunctions.createExecution(task, virtualEngine);

      if (res.status === "failed") {
        throw new Error("Try again");
      }

      if (res.response) {
        notification("Logo Loaded");
        logo = JSON.parse(res.response);
        if(logo){
          locker("logo", JSON.stringify(logo));
        }
        GetBusinessLogos();
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

  //Query.limit(1)


  const GetBusinessLogos = async () => {
    try {
      const dbResponse = await __get(AppSettings.DATABASE, AppSettings.LOGO, [Query.equal('business_id', business.$id), Query.orderDesc('created_at')])

      const dbResponseJson = JSON.parse(dbResponse);
      pastLogos = dbResponseJson.documents;
      logo = pastLogos[0];
      locker("logo", JSON.stringify(logo));
    } catch {
      
    }
  }

  const dismiss = async () => {
    notification("");
  };

  onMount(() => {
    business = JSON.parse($kbve$.business);
    GetBusinessLogos();

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
  <selection>
    <div class="p-6 sm:p-12">
      <h1 class="text-2xl font-semibold text-white-900 dark:text-white">Step 3: Create your logo</h1>
      <div class="p-4"
      >
        <!--<div class="min-h-[100px] min-w-[200px]">
          {#if $notification$}
            <h1>
              <div
                id="toast-default"
                class="flex items-center w-full max-w-xs p-4 bg-offset rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
                role="alert">
                <div
                  class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-blue-500 bg-blue-100 rounded-lg dark:bg-blue-800 dark:text-blue-200">
                  <svg
                    class="w-4 h-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 20">
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15.147 15.085a7.159 7.159 0 0 1-6.189 3.307A6.713 6.713 0 0 1 3.1 15.444c-2.679-4.513.287-8.737.888-9.548A4.373 4.373 0 0 0 5 1.608c1.287.953 6.445 3.218 5.537 10.5 1.5-1.122 2.706-3.01 2.853-6.14 1.433 1.049 3.993 5.395 1.757 9.117Z" />
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
                  on:click={dismiss}>
                  <span class="sr-only">Close</span>
                  <svg
                    class="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14">
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                  </svg>
                </button>
              </div>
            </h1>
          {:else}
            <span
              class="font-bold leading-tight tracking-tight gradient-text text-[150px]">
              Create your logo
            </span>
          {/if}
        </div>-->

        <form
          class="space-y-4 md:space-y-6"
          action="#"
          on:submit|preventDefault={handleTask}
        >
          {#if mounted && !business.business_name}
          <div>
            <label for="username" class="block mb-2 text-sm font-medium"
              >Input your business name:
            </label>
            <input
              type="text"
              name="data"
              id="data"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              placeholder="Wild Goat Coffee"
              required
              bind:value={business.business_name}
            />
          </div>
          {/if}
          <button
            type="submit"
            class="w-full bg-secondary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            disabled={loading}
            ><span>{loading ? "Loading" : "Create Logo"}</span></button
          >
        </form>
       
      </div>

      <div>
        <h2>Generated:</h2>
        <div class="grid grid-cols-6 gap-2">

        {#each pastLogos as logo}
            <img
                src={logo.url}
                alt=""
                width="300"
              />
        {/each}
      </div>
      </div>
      
      <!-- {#if renderIMG}
        <WidgetWrapper
          background="https://kbve.com/assets/img/curved-images/wave.jpg"
        >
          <selection>
            <div
              class="flex flex-col max-w-lg p-6 space-y-6 overflow-hidden rounded-lg shadow-md bg-offset"
            >
              <div class="flex space-x-4">
                <img
                  alt=""
                  src="https://source.unsplash.com/100x100/?portrait"
                  class="object-cover w-12 h-12 rounded-full shadow bg-gray-500"
                />
                <div class="flex flex-col space-y-1">
                  <a
                    rel="noopener noreferrer"
                    href="#/"
                    class="text-sm font-semibold">Atlas</a
                  >
                  <span class="text-xs">Some hours ago</span>
                </div>
              </div>
              <div>
                {#if finalLogo}
                  <img
                    src={finalLogo}
                    alt=""
                    class="object-cover w-full mb-4 h-60 sm:h-96"
                  />
                {:else}
                  <img
                    src="/img/loading-icegif.gif"
                    alt=""
                    class="object-cover w-full mb-4 h-60 sm:h-96"
                  />
                {/if}
                <h2 class="mb-1 text-xl font-semibold gradient-text">
                  {data || "... Still Generating ..."}
                </h2>
                <p class="text-sm">
                  {`Image based off of ${data}` || "... Still Generating ...."}
                </p>
              </div>

              <div class="space-x-2">
                <button
                  aria-label="Share this post"
                  type="button"
                  class="p-2 text-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    class="w-4 h-4 fill-current text-orange-400"
                  >
                    <path
                      d="M404,344a75.9,75.9,0,0,0-60.208,29.7L179.869,280.664a75.693,75.693,0,0,0,0-49.328L343.792,138.3a75.937,75.937,0,1,0-13.776-28.976L163.3,203.946a76,76,0,1,0,0,104.108l166.717,94.623A75.991,75.991,0,1,0,404,344Zm0-296a44,44,0,1,1-44,44A44.049,44.049,0,0,1,404,48ZM108,300a44,44,0,1,1,44-44A44.049,44.049,0,0,1,108,300ZM404,464a44,44,0,1,1,44-44A44.049,44.049,0,0,1,404,464Z"
                    />
                  </svg>
                </button>
                <button
                  aria-label="Bookmark this post"
                  type="button"
                  class="p-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    class="w-4 h-4 fill-current text-orange-400"
                  >
                    <path
                      d="M424,496H388.75L256.008,381.19,123.467,496H88V16H424ZM120,48V456.667l135.992-117.8L392,456.5V48Z"
                    />
                  </svg>
                </button>
              </div>
              <div class="flex space-x-2 text-sm">
                <button type="button" class="flex items-center p-1 space-x-1.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    aria-label="Number of comments"
                    class="w-4 h-4 fill-current text-orange-400"
                  >
                    <path
                      d="M448.205,392.507c30.519-27.2,47.8-63.455,47.8-101.078,0-39.984-18.718-77.378-52.707-105.3C410.218,158.963,366.432,144,320,144s-90.218,14.963-123.293,42.131C162.718,214.051,144,251.445,144,291.429s18.718,77.378,52.707,105.3c33.075,27.168,76.861,42.13,123.293,42.13,6.187,0,12.412-.273,18.585-.816l10.546,9.141A199.849,199.849,0,0,0,480,496h16V461.943l-4.686-4.685A199.17,199.17,0,0,1,448.205,392.507ZM370.089,423l-21.161-18.341-7.056.865A180.275,180.275,0,0,1,320,406.857c-79.4,0-144-51.781-144-115.428S240.6,176,320,176s144,51.781,144,115.429c0,31.71-15.82,61.314-44.546,83.358l-9.215,7.071,4.252,12.035a231.287,231.287,0,0,0,37.882,67.817A167.839,167.839,0,0,1,370.089,423Z"
                    />
                    <path
                      d="M60.185,317.476a220.491,220.491,0,0,0,34.808-63.023l4.22-11.975-9.207-7.066C62.918,214.626,48,186.728,48,156.857,48,96.833,109.009,48,184,48c55.168,0,102.767,26.43,124.077,64.3,3.957-.192,7.931-.3,11.923-.3q12.027,0,23.834,1.167c-8.235-21.335-22.537-40.811-42.2-56.961C270.072,30.279,228.3,16,184,16S97.928,30.279,66.364,56.206C33.886,82.885,16,118.63,16,156.857c0,35.8,16.352,70.295,45.25,96.243a188.4,188.4,0,0,1-40.563,60.729L16,318.515V352H32a190.643,190.643,0,0,0,85.231-20.125,157.3,157.3,0,0,1-5.071-33.645A158.729,158.729,0,0,1,60.185,317.476Z"
                    />
                  </svg>
                  <span>0</span>
                </button>
                <button type="button" class="flex items-center p-1 space-x-1.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    aria-label="Number of likes"
                    class="w-4 h-4 fill-current text-orange-400"
                  >
                    <path
                      d="M126.638,202.672H51.986a24.692,24.692,0,0,0-24.242,19.434,487.088,487.088,0,0,0-1.466,206.535l1.5,7.189a24.94,24.94,0,0,0,24.318,19.78h74.547a24.866,24.866,0,0,0,24.837-24.838V227.509A24.865,24.865,0,0,0,126.638,202.672ZM119.475,423.61H57.916l-.309-1.487a455.085,455.085,0,0,1,.158-187.451h61.71Z"
                    />
                    <path
                      d="M494.459,277.284l-22.09-58.906a24.315,24.315,0,0,0-22.662-15.706H332V173.137l9.573-21.2A88.117,88.117,0,0,0,296.772,35.025a24.3,24.3,0,0,0-31.767,12.1L184.693,222.937V248h23.731L290.7,67.882a56.141,56.141,0,0,1,21.711,70.885l-10.991,24.341L300,169.692v48.98l16,16H444.3L464,287.2v9.272L396.012,415.962H271.07l-86.377-50.67v37.1L256.7,444.633a24.222,24.222,0,0,0,12.25,3.329h131.6a24.246,24.246,0,0,0,21.035-12.234L492.835,310.5A24.26,24.26,0,0,0,496,298.531V285.783A24.144,24.144,0,0,0,494.459,277.284Z"
                    />
                  </svg>
                  <span>0</span>
                </button>
              </div>
            </div>
          </selection>
        </WidgetWrapper>
        <br />
      {/if} -->
    </div>
  </selection>
</WidgetWrapper>

{#if $kbve$.logo && business && logo && business.$id == logo.business_id}
    <Content />
{/if}