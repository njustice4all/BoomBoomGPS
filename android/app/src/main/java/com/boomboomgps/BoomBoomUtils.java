package com.boomboomgps;

import java.util.ArrayList;
import java.util.List;

public class BoomBoomUtils {

  private List<BoomBoomModel> shopLists;
  ArrayList<String> stringArray = new ArrayList<>();

  public BoomBoomUtils(List<BoomBoomModel> shopLists) {
    this.shopLists = shopLists;
  }

  public ArrayList getNears(Double lat, Double lng) {
    ArrayList<Integer> nearLists = new ArrayList<Integer>();
    double shopLat;
    double shopLng;

    for (int i = 0; i < shopLists.size(); i++) {
      shopLat = shopLists.get(i).lat;
      shopLng = shopLists.get(i).lng;

      if (getDistance(shopLat, shopLng, lat, lng)) {
        nearLists.add(i);
        stringArray.add(shopLists.get(i).frequency);
      }
    }

    return nearLists;
  }

  private boolean getDistance(Double shopLat, Double shopLng, Double lat, Double lng) {
    final int R = 6371;
    final double range = 50; // 50m

    double dLat = toRad(lat - shopLat);
    double dLng = toRad(lng - shopLng);

    double a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(toRad(shopLat)) * Math.cos(toRad(lat)) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
    double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    double d = R * c;

    double distance = Double.parseDouble(String.format("%.2f", d)) * 1000;

    return range > distance;
  }

  private Double toRad(Double rad) {
    return rad * Math.PI / 180;
  }

  public String[] frequencyArray() {
    String[] frequency = stringArray.toArray(new String[0]);
    return frequency;
  }
}
