package com.boomboomgps;

import android.Manifest;
import android.app.Activity;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.os.Build;
import android.os.Bundle;
import android.support.v4.app.ActivityCompat;
import android.support.v4.content.ContextCompat;

import com.facebook.react.ReactActivity;

import kr.co.innochal.touchsorilibrary.common.RequestCode;
import kr.co.innochal.touchsorilibrary.common.Error;

public class MainActivity extends ReactActivity {
  private final String[] permissions = new String[]{
    Manifest.permission.RECORD_AUDIO,
    Manifest.permission.WRITE_EXTERNAL_STORAGE,
    Manifest.permission.READ_PHONE_STATE,
    Manifest.permission.ACCESS_FINE_LOCATION
  };

  /**
   * Returns the name of the main component registered from JavaScript.
   * This is used to schedule rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "BoomBoomGPS";
  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    checkPermissions(this);

    BoomBoomHelper helper = new BoomBoomHelper(this);
    boolean status = helper.getPreferences("status");

    if (status) {
      startService(new Intent(this, BoomBoomService.class));
    }
  }

  public Error checkPermissions(Activity activity) {
    boolean completed = true;
    // 퍼미션 체크
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) { // 마시멜로우 (Ver.6.0)
      for (int i = 0; i < permissions.length; i++) {
        if (ContextCompat.checkSelfPermission(getApplicationContext(), permissions[i]) != PackageManager.PERMISSION_GRANTED) {
          completed = false;
          break;
        }
      }
      // 퍼미션 요청
      if (!completed && null != activity) {
        ActivityCompat.requestPermissions(activity, permissions, RequestCode.getRequestCode());
        return Error.PERMISSION_DENIED;
      }
    }
    return Error.NONE;
  }
}
