package com.boomboomgps;

import android.app.Activity;
import android.app.NotificationManager;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.util.Log;

public class BooBoomReceiver extends BroadcastReceiver {

  @Override
  public void onReceive(Context context, Intent intent) {
    String action = intent.getAction();
    int notificationID = intent.getIntExtra("notificationID", 0);
    String uri = intent.getStringExtra("uri");

    switch (action) {
      case Intent.ACTION_BOOT_COMPLETED:
        Log.e("BOOM - BOOT_COMPLETED", "BOOM BOOM POW!!!");
        Intent myIntent = new Intent(context, BoomBoomService.class);
        context.startService(myIntent);
        break;
      case BoomBoomNoti.OPEN:
        openBrowser(context, notificationID, uri);
        break;
      case BoomBoomNoti.CLOSE:
        closeNotification(context, notificationID);
        break;
    }
  }

  private void openBrowser(Context context, int notificationID, String uri) {
    Intent browser = new Intent(Intent.ACTION_VIEW, Uri.parse(uri));
    browser.setPackage("com.android.chrome");
    context.startActivity(browser);
    closeNotification(context, notificationID);
  }

  private void closeNotification(Context context, int notificationID) {
    NotificationManager notificationManager = (NotificationManager) context.getSystemService(Activity.NOTIFICATION_SERVICE);
    notificationManager.cancel(notificationID);
    context.sendBroadcast(new Intent(Intent.ACTION_CLOSE_SYSTEM_DIALOGS));
  }
}
