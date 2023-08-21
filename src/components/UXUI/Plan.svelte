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
  import { __get, appwriteAccount, appwriteFunctions } from "@c/appwrite/appwrite";
  import { AppSettings } from "src/constants";
  import { type LogoResponse, type BusinessResponse } from "@c/kbve";
  import { Query } from "appwrite";

  let loading = false;
  let renderIMG = false;
  let mounted = false;
  let appWriteFunctionLoaded = false;
  let skeleton: any;

  let appWriteFunction = AppSettings.CREATE_BUSINESS_PLAN_APPWRITE_FUNCTION;
  let virtualEngine: any;
  let business: BusinessResponse;
  let businessPlan: LogoResponse;
  let businessPlanResponse: LogoResponse;
  let pastBusinessPlans: LogoResponse[] = [];
  let businessSelected = false;

  const dispatch = createEventDispatcher();

  const AppWriteFunctionData = async (url: string) => {};
  const ValidData = () => {
    if (business.business_name.length < 1) {
      notification("Data needs to be longer!");
      return false;
    } else if (business.business_name.length > 100) {
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
      virtualEngine = JSON.stringify({ businessName: business.business_name, businessId: business.$id, businessIdea: business.business_idea });
      console.log(virtualEngine);
      const res = await appwriteFunctions.createExecution(appWriteFunction, virtualEngine);

      if (res.status === "failed") {
        throw new Error("Try again");
      }

      if (res.response) {
        notification("Business Plan Loaded");
        businessPlan = JSON.parse(res.response);
        if(businessPlan){
          locker("businessPlan", JSON.stringify(businessPlan));
        }
        GetBusinessPlans();
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

  const GetBusinessPlans = async () => {
    try {
      const dbResponse = await __get(AppSettings.DATABASE, AppSettings.BUSINESS_PLAN, [Query.equal('business_id', business.$id), Query.orderDesc("created_at")])

      const dbResponseJson = JSON.parse(dbResponse);
      pastBusinessPlans = dbResponseJson.documents;
    
    } catch {
      
    }
  }

  const dismiss = async () => {
    notification("");
  };

  onMount(() => {
    business = JSON.parse($kbve$.business);
    GetBusinessPlans();
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
      <h1 class="text-xl font-semibold text-white-1200 dark:text-white">
        Step 2: Create a Business Plan.
      </h1>
      <h1 class="text-xl font-semibold text-white-1200 dark:text-white">
        This can take a while, please proceed to create logos, graphical business content, and your website!
      </h1>
      <div class="p-4"
      >
        <form
          class="space-y-4 md:space-y-6"
          action="#"
          on:submit|preventDefault={handleAppWriteFunction}
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
            ><span>{loading ? "Loading" : "Generate Business Plan"}</span></button
          >
        </form>
        
      </div>
      <div>
        <h2>Generated:</h2>
        <div class="grid grid-cols-2 gap-2">
  
        {#each pastBusinessPlans as businessPlan}
        <iframe
          style="background: #FFFFFF;"
          title={businessPlan.$id}
          src={businessPlan.url}
          width="800"
          height="800"
        />
        {/each}
      </div>
      </div>
    </div>
    
  </selection>
</WidgetWrapper>

<Logo />