if(window.isBanter){
  // create a reference to the banter scene
  const chatscene = BS.BanterScene.GetInstance();
  
  async function somerandomStartCrap() {
    const waitingForUnity = async () => { while (!chatscene.unityLoaded) { await new Promise(resolve => setTimeout(resolve, 500)); } };
    await waitingForUnity(); console.log("SCRIPT: Unity-Loaded");
    setTimeout(() => { loadSettings(); infotextStuff(); }, 1000);
  };

  function loadSettings() {
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
    chatscene.TeleportTo({x: 0, y: 0.2, z: 0}, 0, true);
    chatscene.SetSettings(settings);
    console.log("SCRIPT finish setting settings for scene");
    setTimeout(() => { chatscene.TeleportTo({x: 0, y: 0.2, z: 0}, 0, true); chatscene.SetSettings(settings); }, 2000);
  };

  async function infotextStuff() {
    const textObject = new BS.GameObject("InfoText");
    const infoText = await textObject.AddComponent(new BS.BanterText("Messages will appear on the browser", new BS.Vector4(1, 1, 1, 1)));
    const textTransform = await textObject.AddComponent(new BS.Transform());
    textTransform.position = new BS.Vector3(8, 1, 5);
    // textTransform.localPosition = new BS.Vector3(8.1, -1, 0); infoText.text = "label";
  }

  somerandomStartCrap();

};