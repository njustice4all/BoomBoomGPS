package com.boomboomgps;

public class BoomBoomModel {
  String name;
  String uri;
  String frequency;
  String description;
  int id;
  double lat, lng;

  public BoomBoomModel(String name, int id, double lat, double lng, String uri, String frequency, String description) {
    this.name = name;
    this.id = id;
    this.lat = lat;
    this.lng = lng;
    this.uri = uri;
    this.frequency = frequency;
    this.description = description;
  }

  public BoomBoomModel() {
  }

  @Override
  public String toString() {
    return "id: " + id + " name: " + name + " lat: " + lat + " lng: " + lng;
  }

  public String getDescription() {
    return description;
  }

  public String getName() {
    return name;
  }

  public String getUri() {
    return uri;
  }

  public String getFrequency() {
    return frequency;
  }

  public int getId() {
    return id;
  }

  public double getLat() {
    return lat;
  }

  public double getLng() {
    return lng;
  }
}