package com.boomboomgps;

import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.location.Location;
import android.location.LocationManager;
import android.os.Bundle;
import android.os.IBinder;
import android.util.Log;
import android.widget.Toast;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import kr.co.innochal.touchsorilibrary.classes.OnTouchSoriListener;
import kr.co.innochal.touchsorilibrary.classes.TouchSori;
import kr.co.innochal.touchsorilibrary.common.SoundResult;
import kr.co.innochal.touchsorilibrary.common.Status;

public class BoomBoomService extends Service {

  private static final String TAG = "BOOMBOOMGPS";
  private LocationManager mLocationManager = null;
  private static final int LOCATION_INTERVAL = 10000;
  private static final float LOCATION_DISTANCE = 0;

  public static TouchSori touchSori;
  public static Status currentStatus;
//  public static final HashMap<Result, Integer> soundMap;
  private List<BoomBoomModel> shopLists;
  private final String url = "http://192.168.10.53:3001/locations";

  private BoomBoomHelper boomBoomHelper;
  private BoomBoomUtils boomBoomUtils;

//  static {
//    soundMap = new HashMap<>();
//    soundMap.put(Result.SOUND_PARSE_RESULT_BUTTON0, 0);
//    soundMap.put(Result.SOUND_PARSE_RESULT_BUTTON1, 0);
//    soundMap.put(Result.SOUND_PARSE_RESULT_BUTTON2, 0);
//    soundMap.put(Result.SOUND_PARSE_RESULT_BUTTON3, 0);
//    soundMap.put(Result.SOUND_PARSE_RESULT_BUTTON4, 0);
//    soundMap.put(Result.SOUND_PARSE_RESULT_BUTTON5, 0);
//    soundMap.put(Result.SOUND_PARSE_RESULT_BUTTON6, 0);
//    soundMap.put(Result.SOUND_PARSE_RESULT_BUTTON7, 0);
//    soundMap.put(Result.SOUND_PARSE_RESULT_BUTTON9, 0);
//  }

  LocationListener[] mLocationListeners = new LocationListener[]{
    new LocationListener(LocationManager.GPS_PROVIDER),
    new LocationListener(LocationManager.NETWORK_PROVIDER)
  };

  @Override
  public IBinder onBind(Intent arg0) {
    return null;
  }

  @Override
  public int onStartCommand(Intent intent, int flags, int startId) {
    super.onStartCommand(intent, flags, startId);

    initTouchSori();

    return START_STICKY;
  }

  @Override
  public void onCreate() {
    Toast.makeText(this, "아티사운드 서비스 등록", Toast.LENGTH_SHORT).show();
    boomBoomHelper = new BoomBoomHelper(getApplicationContext());

    initializeLocationManager();

    shopLists = boomBoomHelper.fetchLocations();
    boomBoomUtils = new BoomBoomUtils(shopLists);

    try {
      mLocationManager.requestLocationUpdates(
        LocationManager.NETWORK_PROVIDER,
        LOCATION_INTERVAL,
        LOCATION_DISTANCE,
        mLocationListeners[1]
      );
    } catch (java.lang.SecurityException ex) {
      Log.i(TAG, "fail to request location update, ignore", ex);
    } catch (IllegalArgumentException ex) {
      Log.d(TAG, "network provider does not exist, " + ex.getMessage());
    }

    try {
      mLocationManager.requestLocationUpdates(
        LocationManager.GPS_PROVIDER,
        LOCATION_INTERVAL,
        LOCATION_DISTANCE,
        mLocationListeners[0]
      );
    } catch (java.lang.SecurityException ex) {
      Log.i(TAG, "fail to request location update, ignore", ex);
    } catch (IllegalArgumentException ex) {
      Log.d(TAG, "gps provider does not exist " + ex.getMessage());
    }
  }

  @Override
  public void onDestroy() {
    Toast.makeText(this, "아티사운드 서비스 해제", Toast.LENGTH_SHORT).show();
    super.onDestroy();

    if (mLocationManager != null) {
      for (int i = 0; i < mLocationListeners.length; i++) {
        try {
          mLocationManager.removeUpdates(mLocationListeners[i]);
        } catch (Exception ex) {
          Log.i(TAG, "fail to remove location listners, ignore", ex);
        }
      }
    }
  }

  private class LocationListener implements android.location.LocationListener {
    Location mLastLocation;

    public LocationListener(String provider) {
      mLastLocation = new Location(provider);
    }

    @Override
    public void onLocationChanged(Location location) {
      mLastLocation.set(location);
      double lat = location.getLatitude();
      double lng = location.getLongitude();

      // BoomBoomUtils class에 stringArray있기때문에 위치 바뀔때마다 library init할 배열 업데이트
      boomBoomUtils.getNears(lat, lng);

      Log.e("LOCATION CHANGED!", currentStatus + "");

      if (boomBoomUtils.getNears(lat, lng).size() > 0 && currentStatus != Status.START) {
        String[] frequencyStringArray = boomBoomUtils.frequencyArray();
        // FIXME: for logging
        for (String hey : frequencyStringArray) {
          Log.e("BOOM!!!", hey);
        }
        // 터치소리 시작
        String[] test = {
          "A_0_1",
          "A_0_2",
        };
        touchSori.startTouchSori(test);
        // touchSori.startTouchSori(frequencyStringArray);
      } else if (boomBoomUtils.getNears(lat, lng).size() == 0 && currentStatus == Status.START) {
        Log.e("stop", "stop");
        // 터치소리 중지
        touchSori.stopTouchSori();
      }
    }

    @Override
    public void onProviderDisabled(String provider) {
      Log.e(TAG, "onProviderDisabled: " + provider);
      if (currentStatus == Status.START) {
        touchSori.stopTouchSori();
      }
    }

    @Override
    public void onProviderEnabled(String provider) {
      Log.e(TAG, "onProviderEnabled: " + provider);
    }

    @Override
    public void onStatusChanged(String provider, int status, Bundle extras) {
      Log.e(TAG, "onStatusChanged: " + provider);
    }
  } // end of Locationlistener

  private void initializeLocationManager() {
    if (mLocationManager == null) {
      mLocationManager = (LocationManager) getApplicationContext().getSystemService(Context.LOCATION_SERVICE);
    }
  }

  private void initTouchSori() {
    touchSori = TouchSori.getInstance(this);

    touchSori.setOnTouchSoriListener(new OnTouchSoriListener() {
      @Override
      public void onServiceStatus(Status status, String s) {
        Log.e("TouchSori - STATUS", s);
        currentStatus = status;
      }

      @Override
      public void onSoundDetected(SoundResult soundResult, String s) {
        BoomBoomModel shop = new BoomBoomModel();
        String[] result = soundResult.toString().split("SOUND_RESULT_");
        Log.e("BOOM!!!!!", result[1]);

        try {
          for (int i = 0; i < shopLists.size(); i++) {
            if (shopLists.get(i).frequency.equals(result[1])) {
              shop = new BoomBoomModel(
                shopLists.get(i).name,
                shopLists.get(i).id,
                shopLists.get(i).lat,
                shopLists.get(i).lng,
                shopLists.get(i).uri,
                shopLists.get(i).frequency,
                shopLists.get(i).description
              );
            }
          }
        } catch (Exception e) {
          e.printStackTrace();
        }

        boomBoomHelper.boomBoomGetNoti(shop);
      }
    });

//    touchSori.setOnTouchSoriListener(new OnTouchSoriListener() {
//      @Override
//      public void onServiceStatus(Status status, String s) {
//        Log.e("TouchSori - STATUS", s);
//        currentStatus = status;
//      }
//
//      @Override
//      public void onPressedButton(Result result, String s) {
//        BoomBoomModel shop = new BoomBoomModel();
//
//        if (soundMap.get(result) > 0) {
//          // FIXME: 테스트용으로 주석
//          // return;
//        }
//
//        try {
//          for (int i = 0; i < shopLists.size(); i++) {
//            if (shopLists.get(i).frequency.equals(result.name())) {
//              shop = new BoomBoomModel(
//                shopLists.get(i).name,
//                shopLists.get(i).id,
//                shopLists.get(i).lat,
//                shopLists.get(i).lng,
//                shopLists.get(i).uri,
//                shopLists.get(i).frequency,
//                shopLists.get(i).description
//              );
//            }
//          }
//        } catch (Exception e) {
//          e.printStackTrace();
//        }
//
//        soundMap.put(result, soundMap.get(result) + 1);
//        boomBoomHelper.boomBoomGetNoti(shop);
//      }
//    });
  }
}
