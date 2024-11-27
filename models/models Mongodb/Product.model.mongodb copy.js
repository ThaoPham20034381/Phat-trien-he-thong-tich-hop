const mongoose = require("mongoose");

const { Schema } = mongoose;

// Schema cho mỗi màu sắc
const ColorSchema = new mongoose.Schema({
  color: String,
  price: Number,
});

// Schema cho mỗi tùy chọn lưu trữ
const StorageSchema = new mongoose.Schema({
  size: String,
  colors: [ColorSchema],
});

// Schema cho mỗi tùy chọn RAM và các tùy chọn lưu trữ tương ứng
const OptionSchema = new mongoose.Schema({
  ram: String,
  storage: [StorageSchema],
});

//const optionColor = new Schema({
//  optionColor: String,
//  price: String,
//});

//const optionRam = new Schema({
//  optionRam: String,
//  price: String,
//});

//const optionMemory = new Schema({
//  optionMemory: String,
//  price: String,
//});

const processor = new Schema({
  cpuTechnology: String,
  multiplier: String,
  numberOfStreams: String,
  cpuSpeed: String,
  maxSpeed: String,
  caching: String,
});

const ramMemory_hardDrive = new Schema({
  ram: String,
  ramType: String,
  ramBusSpeed: String,
  MaximumRamSupport: String,
  HardDrive: String,
});

const screen = new Schema({
  screen: String,
  resolution: String,
  scanFrequency: String,
  colorCoverage: String,
  screenTechnology: String,
});

const graphicsAndSound = new Schema({
  GraphicCard: String,
  AudioTechnology: String,
});

const connectionPortsAndExpansionFeatures = new Schema({
  TheWebOfCommunication: String,
  WirelessConnectivity: String,
  Webcams: String,
  KeyboardLight: String,
});

const sizeVolume = new Schema({
  Size: String,
  volume: String,
  Material: String,
});

const otherInformation = new Schema({
  BatteryInformation: String,
  ChargerCapacity: String,
  OperatingSystem: String,
  LaunchTime: String,
});

const product = new Schema({
  nameLaptop: String,

  option: [OptionSchema],

  //optionColorPrice: [optionColor],
  //optionRamPrice: [optionRam],
  //optionMemoryPrice: [optionMemory],

  price: String,
  image: [String],
  slug: String,
  productInformation: String,
  Specifications: {
    processor,
    ramMemory_hardDrive,
    screen,
    graphicsAndSound,
    connectionPortsAndExpansionFeatures,
    sizeVolume,
    otherInformation,
  },
});

const productModel = mongoose.model("productModel", product);

module.exports = {
  productModel,
};
