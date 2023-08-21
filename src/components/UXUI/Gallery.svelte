<script lang="ts">
  import { onMount, onDestroy, createEventDispatcher } from "svelte";
  import WidgetWrapper from "@c/UXUI/WidgetWrapper.svelte";
  //	Client Storage
  import { kbve$ } from "@c/appwrite/storage";
  import { __get } from "@c/appwrite/appwrite";
  import { AppSettings } from "src/constants";
  import { Query } from "appwrite";
  import { type BusinessResponse, type LogoResponse } from "@c/kbve";

  let mounted = false;
  let loaded = false;
  let galleryLoad = false;
  let dbResponseJson;
  let widgetID: any;
  let skeleton: any;
  let business: BusinessResponse;

  let logo: LogoResponse;
  let pastLogos: LogoResponse[] = [];

  const dispatch = createEventDispatcher();

  const GetBusinessLogos = async () => {
    try {
      const dbResponse = await __get(AppSettings.DATABASE, AppSettings.LOGO, [
        Query.equal("business_id",business.$id),
        Query.orderDesc("created_at"),
      ]);

        pastLogos = JSON.parse(dbResponse).documents;

    } catch {}
  };

  const galleryData = async () => {
    try { await GetBusinessLogos() }
        finally {
            galleryLoad = true;
        }
    //widgetID = JSON.parse($kbve$.logo);
    //console.log(JSON.stringify(widgetID));
  };

  onMount(() => {
    business = JSON.parse($kbve$.business);

    mounted = true;
  });

  onDestroy(() => {});

  $: if (mounted && !galleryLoad) {
    galleryData();

    //skeleton = window.document.getElementById("skeleton") as HTMLElement;
    //if (skeleton) skeleton.remove();
  }
</script>

<WidgetWrapper>
  {#if galleryLoad}
    <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
      {#each pastLogos as logo (logo.$id)}
        <div>
          <img src={logo.url} class="h-auto max-w-full rounded-lg" alt="" />
        </div>
      {/each}
    </div>
  {/if}
</WidgetWrapper>
