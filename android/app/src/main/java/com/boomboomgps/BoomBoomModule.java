package com.boomboomgps;

import android.content.Context;
import android.content.Intent;
import android.provider.Settings;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Nullable;

import kr.co.innochal.touchsorilibrary.common.Status;

public class BoomBoomModule extends ReactContextBaseJavaModule {

  private Context context;
  private BoomBoomHelper helper;

  public BoomBoomModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.context = reactContext;
    helper = new BoomBoomHelper(context);
  }

  @Override
  public String getName() {
    return "BoomBoomGPS";
  }

  @Nullable
  @Override
  public Map<String, Object> getConstants() {
    final Map<String, Object> constants = new HashMap<>();
    constants.put("HEY","HEY");

    return constants;
  }

  @ReactMethod
  public void setGPS() {
    Intent intent = new Intent(Settings.ACTION_LOCATION_SOURCE_SETTINGS);
    context.startActivity(intent);
  }

  @ReactMethod
  public void setListenStatus(boolean status) {
    helper.setPreferences("status", status);

    if (!status) {
      if (BoomBoomService.currentStatus == Status.START) {
        BoomBoomService.touchSori.stopTouchSori();
      }

      context.stopService(new Intent(context, BoomBoomService.class));
    } else {
      context.startService(new Intent(context, BoomBoomService.class));
    }
  }

  @ReactMethod
  public void getListenStatus(Promise promise) {
    promise.resolve(helper.getPreferences("status"));
  }
}
