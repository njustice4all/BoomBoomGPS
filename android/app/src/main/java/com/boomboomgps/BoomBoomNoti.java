package com.boomboomgps;

import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.graphics.BitmapFactory;
import android.os.AsyncTask;
import android.os.PowerManager;
import android.support.v4.app.NotificationCompat;
import android.support.v4.app.NotificationManagerCompat;
import android.util.Log;

import java.util.Random;

public class BoomBoomNoti extends AsyncTask<Void, Void, Void> {

  public static final String OPEN = "OPEN";
  public static final String CLOSE = "CLOSE";

  private Context context;
  private BoomBoomModel shop;

  public BoomBoomNoti(Context context, BoomBoomModel shop) {
    this.context = context;
    this.shop = shop;
  }

  @Override
  protected Void doInBackground(Void... voids) {
    final int NOTIFICATION_ID = new Random().nextInt();

    try {
      Intent openIntent = new Intent(context, BooBoomReceiver.class);
      openIntent.putExtra("notificationID", NOTIFICATION_ID);
      openIntent.putExtra("uri", shop.uri);
      openIntent.setAction(OPEN);

      PendingIntent openPendingIntent = PendingIntent.getBroadcast(context, NOTIFICATION_ID, openIntent, PendingIntent.FLAG_CANCEL_CURRENT);

      Intent closeIntent = new Intent(context, BooBoomReceiver.class);
      closeIntent.putExtra("notificationID", NOTIFICATION_ID);
      closeIntent.setAction(CLOSE);

      PendingIntent closePendingIntent = PendingIntent.getBroadcast(context, NOTIFICATION_ID, closeIntent, PendingIntent.FLAG_CANCEL_CURRENT);

      NotificationCompat.Builder notification = new NotificationCompat.Builder(context)
        .setSmallIcon(R.drawable.ic_stat_name)
        .setLargeIcon(BitmapFactory.decodeResource(context.getResources(), R.mipmap.ic_launcher_foreground))
        .setContentTitle(shop.name)
        .setContentText(shop.description)
        .setAutoCancel(true)
        .setVisibility(NotificationCompat.VISIBILITY_PRIVATE)
        .setPriority(NotificationCompat.PRIORITY_MAX)
        .setVibrate(new long[] { 0, 300L })
        .addAction(new NotificationCompat.Action(R.drawable.check, "열기", openPendingIntent))
        .addAction(new NotificationCompat.Action(R.drawable.check, "닫기", closePendingIntent));

      NotificationManagerCompat.from(context).notify(NOTIFICATION_ID, notification.build());

      PowerManager powerManager = (PowerManager) context.getSystemService(Context.POWER_SERVICE);
      PowerManager.WakeLock wakeLock = powerManager.newWakeLock(PowerManager.PARTIAL_WAKE_LOCK | PowerManager.ACQUIRE_CAUSES_WAKEUP, "Tag");
      wakeLock.acquire();
      wakeLock.release();
    } catch (Exception e) {
      Log.e("BOOM!", "failed send notification", e);
    }

    return null;
  }
}
