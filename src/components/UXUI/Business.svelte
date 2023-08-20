<script lang="ts" context="module">
  declare global {
    interface Window {}
  }

 
</script>

<script lang="ts">
  import { onMount, onDestroy, createEventDispatcher } from "svelte";
  import WidgetWrapper from "./WidgetWrapper.svelte";
  import Notification from "./Notification.svelte";
  import Logo from "./Logo.svelte";
  import { kbve$, log, notification$, notification, locker } from "@c/appwrite/storage";
  import { appwriteAccount, appwriteFunctions } from "@c/appwrite/appwrite";
  import { AppSettings } from "src/constants";
  import { type BusinessResponse } from "@c/kbve";

  let loading = false;
  let renderIMG = false;
  let mounted = false;
  let appWriteFunctionLoaded = false;
  let skeleton: any;

  let appWriteFunction = AppSettings.CREATE_BUSINESS_APPWRITE_FUNCTION;
  let businessName = "";
  let businessIdea = "";
  let virtualEngine: any;
  let businessFunctionResponse: BusinessResponse;

  const dispatch = createEventDispatcher();

  const AppWriteFunctionData = async (url: string) => {};
  const ValidData = () => {
    if (businessIdea.length < 1 || businessName.length < 1) {
      notification("Data needs to be longer!");
      return false;
    } else if (businessIdea.length > 1000 || businessName.length > 100) {
      notification("Data needs to be shorter!");
      return false;
    } else {
      return true;
    }
  };

  const handleAppWriteFunction = () => {
    notification("Running");
    if (ValidData()) _handleAppWriteFunction();
  };

  const _handleAppWriteFunction = async () => {
    try {
      loading = true;
      renderIMG = true;
      virtualEngine = JSON.stringify({
        businessName: businessName,
        businessIdea: businessIdea,
      });

      const res = await appwriteFunctions.createExecution(
        appWriteFunction,
        virtualEngine
      );

      notification("Loading...");

      if (res.status === "failed") {
        throw new Error("Internal Error. Try again later.");
      }

      if (res.response) {
        notification("Business Created!");
        businessFunctionResponse = JSON.parse(res.response);
        if(businessFunctionResponse){
            locker("business", JSON.stringify(businessFunctionResponse));
        }
        
        
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

  $: if (mounted && !appWriteFunctionLoaded) {
    //TaskData();
    skeleton = window.document.getElementById("skeleton") as HTMLElement;
    if (skeleton) skeleton.remove();
  }
</script>

<WidgetWrapper background="https://kbve.com/assets/img/curved-images/wave.jpg">
  <selection>
    <div class="p-6 sm:p-12">
      <h1 class="text-2xl font-semibold text-white-900 dark:text-white">
        Step 1: Define your business
      </h1>

      <div
        class="flex flex-col space-y-4 md:space-y-0 items-center justify-center md:space-x-6 md:flex-row"
      >
        <form
          class="space-y-4 md:space-y-6"
          action="#"
          on:submit|preventDefault={handleAppWriteFunction}
        >
          <div>
            <label for="username" class="block mb-2 text-sm font-medium"
              >Input your business name:
            </label>
            <input
              type="text"
              name="businessName"
              id="businessName"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              placeholder="Wild Goat Coffee"
              required
              bind:value={businessName}
            />
            <label for="username" class="block mb-2 text-sm font-medium"
              >Input your business idea:
            </label>
            <input
              type="text"
              name="businessIdea"
              id="businessIdea"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              placeholder="Wild Goat Coffee is a Palo Alto Based Coffee Shop that sells coffee, tea, and pastries."
              required
              bind:value={businessIdea}
            />
          </div>

          <button
            type="submit"
            class="w-full bg-secondary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            disabled={loading}
            ><span>{loading ? "Loading" : "Generate Business"}</span></button
          >
        </form>
      </div>
    </div>
  </selection>
</WidgetWrapper>
{#if businessFunctionResponse}
  <Logo />
{/if}

{#if $notification$}
  <Notification />
{/if}
