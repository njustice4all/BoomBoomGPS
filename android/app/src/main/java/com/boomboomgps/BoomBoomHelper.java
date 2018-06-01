package com.boomboomgps;

import android.content.Context;
import android.content.SharedPreferences;
import android.util.Log;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

public class BoomBoomHelper {

  private Context context;
  private final String url = "http://192.168.10.53:3001/locations";

  public BoomBoomHelper(Context context) {
    this.context = context;
  }

  public void boomBoomGetNoti(BoomBoomModel shop) {
    new BoomBoomNoti(context, shop).execute();
  }

  public void setPreferences(String key, boolean value) {
    SharedPreferences sp = context.getSharedPreferences("boomboomConfig", context.MODE_PRIVATE);
    SharedPreferences.Editor editor = sp.edit();
    editor.putBoolean(key, value);
    editor.apply();
  }

  public boolean getPreferences(String key) {
    SharedPreferences sp = context.getSharedPreferences("boomboomConfig", context.MODE_PRIVATE);
    return sp.getBoolean(key, true);
  }

  public List<BoomBoomModel> fetchLocations() {
    final List<BoomBoomModel> shopLists = new ArrayList<>();

    StringRequest stringRequest = new StringRequest(Request.Method.GET, url, new Response.Listener<String>() {
      @Override
      public void onResponse(String response) {
        Log.e("RECEIVED SUCCESS", "SUCCESS");
        try {
          JSONArray jsonArray = new JSONArray(response);

          for (int i = 0; i < jsonArray.length(); i++) {
            JSONObject locationObj = jsonArray.getJSONObject(i);

            BoomBoomModel shop = new BoomBoomModel(
              locationObj.getString("name"),
              locationObj.getInt("id"),
              locationObj.getDouble("lat"),
              locationObj.getDouble("lng"),
              locationObj.getString("uri"),
              locationObj.getString("frequency"),
              locationObj.getString("description")
            );

            shopLists.add(shop);
          }
        } catch (JSONException e) {
          e.printStackTrace();
          Log.e("ERROR ON FETCH", e + "");
        }
      }
    }, new Response.ErrorListener() {
      @Override
      public void onErrorResponse(VolleyError error) {
        Log.e("ERROR", error + "");
      }
    });

    RequestQueue queue = Volley.newRequestQueue(context);
    queue.add(stringRequest);

    return shopLists;
  }
}
