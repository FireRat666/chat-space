(function () {
    let initialized = false;

    async function initGame() {
        if (initialized) return;
        initialized = true;

        // create a reference to the banter scene
        const chatscene = BS.BanterScene.GetInstance();

        async function somerandomStartCrap() {
            console.log("SCRIPT: Unity-Loaded (via initGame)");
            setTimeout(() => { loadSettings(); infotextStuff(); landingPlatform(); drawingTools(); }, 1000);
        };

        function loadSettings() {
            const randomLocationX = Math.round((Math.random() * 2 - 1) * 10) / 10;
            const randomLocationZ = Math.round((Math.random() * 3 - 2) * 10) / 10;
            console.log("SCRIPT setSceneSettings Loading...");
            // SetSettings - Set settings for the current space like spawn position, portals, guest access etc.
            const settings = new BS.SceneSettings();
            settings.EnableTeleport = true;
            settings.EnableForceGrab = false;
            settings.EnableSpiderMan = true;
            settings.EnablePortals = true;
            settings.EnableGuests = true;
            // settings.EnableQuaternionPose = false;
            // settings.EnableControllerExtras = false;
            // settings.EnableFriendPositionJoin = false;
            // settings.EnableDefaultTextures = true;
            // settings.EnableAvatars = true;
            settings.MaxOccupancy = 30;
            settings.RefreshRate = 72;
            settings.ClippingPlane = new BS.Vector2(0.05, 500);
            settings.SpawnPoint = new BS.Vector4(0, 0.1, 0, 90);
            chatscene.TeleportTo({x: randomLocationX, y: 0.2, z: randomLocationZ}, 0, true);
            chatscene.SetSettings(settings);
            console.log("SCRIPT finish setting settings for scene");
            setTimeout(() => { chatscene.TeleportTo({x: randomLocationX, y: 0.2, z: randomLocationZ}, 0, true); chatscene.SetSettings(settings); }, 2000);
        };

        async function infotextStuff() {
            const textObject = new BS.GameObject("InfoText");
            const infoText = await textObject.AddComponent(new BS.BanterText("Messages will appear on the browser", new BS.Vector4(1, 1, 1, 1)));
            const textTransform = await textObject.AddComponent(new BS.Transform());
            textTransform.position = new BS.Vector3(0, 1, 5);
            // textTransform.localPosition = new BS.Vector3(8.1, -1, 0); infoText.text = "label";
        }

        async function landingPlatform() {
            const platformObject = new BS.GameObject("landingPlane");
            await platformObject.AddComponent(new BS.BanterGeometry(BS.GeometryType.BoxGeometry));
            await platformObject.AddComponent(new BS.BoxCollider(false));
            await platformObject.AddComponent(new BS.BanterMaterial("Unlit/Diffuse", "",  new BS.Vector4(0,0,0,1)));
            const plane20transform = await platformObject.AddComponent(new BS.Transform());

            plane20transform.localPosition = new BS.Vector3(0,-0.2,0);
            plane20transform.localScale = new BS.Vector3(10,0.05,10);
        }

        async function drawingTools() {
            const kitDrawWindows = "https://chat-space.firer.at/DrawTools/kitbundle_standalonewindows.banter";
            const kitDrawAndroid = "https://chat-space.firer.at/DrawTools/kitbundle_android.banter";
            const drawToolsObject = await new BS.GameObject("MyDrawTools");
            const kitDrawBundle = await drawToolsObject.AddComponent(new BS.BanterAssetBundle(kitDrawWindows, null, null, kitDrawAndroid, null, null, false));
            setTimeout(async () => {
                const drawToolItemPath = "assets/_prefabs/drawgadget/drawtool.prefab";
                const drawToolGameObject = await new BS.GameObject("MyKitItem");
                const drawToolItem = await drawToolGameObject.AddComponent(new BS.BanterKitItem(drawToolItemPath));
                const drawToolGameObjectTransform = await drawToolGameObject.AddComponent(new BS.Transform());
                setTimeout(async () => {
                    drawToolGameObjectTransform.position = new BS.Vector3(4,1.3,-2);
                    drawToolGameObjectTransform.eulerAngles = new BS.Vector3(0,90,0);
                    console.log("Kit item loaded successfully!");
                }, 500);
            }, 2000);
        };

        somerandomStartCrap();
    }

    // --- Check for BS availability ---
    if (window.BS) {
        initGame();
    } else {
        window.addEventListener("unity-loaded", initGame);
        window.addEventListener("bs-loaded", initGame);
    }
})();