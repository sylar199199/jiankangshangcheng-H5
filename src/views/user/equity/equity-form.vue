<template>
  <div class="container">
    <div class="form-div">
      <van-form @submit="onSubmit" @failed="onFailed">
        <div class="personmessage">
          <div v-if="formType != 11 && formType != 12">
            <div class="top">
              <div>
                <div class="form-item spaceBetween">
                  <label>{{forWho}}</label>
                  <van-field
                    readonly
                    clickable
                    name="picker"
                    :value="value"
                    placeholder="请选择"
                    @click="showPicker = true"
                    style="text-align: center"
                  />
                  <van-popup v-model="showPicker" position="bottom">
                    <van-picker
                      show-toolbar
                      :columns="columns"
                      @confirm="onConfirm"
                      @cancel="showPicker = false"
                    ></van-picker>
                  </van-popup>
                </div>
              </div>
            </div>
            <div class="form-item spaceBetween">
              <label>{{usedName}}</label>
              <van-field
                clickable
                v-model="form.name"
                placeholder="为方便服务安排，请填写真实姓名"
                :rules="[{ pattern, message: `请输入${usedName}` }]"
              ></van-field>
            </div>
            <div class="form-item spaceBetween">
              <label>性别</label>
              <div class="sex-group">
                <div class="button" @click="form.sex = 1" :class="form.sex === 1 ? 'bcSuccse': ''">男</div>
                <div class="button" @click="form.sex = 2" :class="form.sex === 2 ? 'bcSuccse': ''">女</div>
              </div>
            </div>
            <div class="xian" v-if="formType == 1 || formType == 2 || formType == 13">
              <div class="marginBottom"></div>
            </div>
            <div class="form-item spaceBetween" v-if="formType == 1 || formType == 2 || formType == 13">
              <label>证件类型</label>
              <van-field
                readonly
                clickable
                name="picker"
                :value="form.idTypeName"
                placeholder="请选择"
                @click="showIdType= true"
                style="text-align: center"
              ></van-field>
              <van-popup v-model="showIdType" position="bottom">
                <van-picker
                  show-toolbar
                  :columns="idTypeList"
                  value-key="name"
                  @confirm="onIdType"
                  @cancel="showIdType = false"
                ></van-picker>
              </van-popup>
            </div>
            <div class="xian" v-if="formType == 1 || formType == 2 || formType == 13">
              <div class="marginBottom"></div>
            </div>
            <div class="form-item spaceBetween" v-if="formType == 1 || formType == 2 || formType == 13">
              <label>证件号码</label>
              <van-field
                v-if="form.idType == 1"
                clickable
                v-model="form.userCardNo"
                placeholder="为方便安排服务，请准确填写"
                @blur="getBrithday"
                :rules="[{ validator: idCardvalidator, message: '请填写正确证件号码'}]"
              />
              <van-field
                v-else
                clickable
                v-model="form.userCardNo"
                placeholder="为方便安排服务，请准确填写"
                :rules="[{ pattern, message: '请填写证件号码'}]"
              />
            </div>
            <div class="xian">
              <div class="marginBottom"></div>
            </div>
            <div class="form-item spaceBetween">
              <label>出生日期</label>
              <van-field
                readonly
                clickable
                name="datePicker"
                :value="form.birthDay"
                placeholder="选择出生日期"
                @click="showbirthDayPicker = true"
                :rules="[{ pattern, message: '请选择出生日期' }]"
              ></van-field>
              <van-popup v-model="showbirthDayPicker" position="bottom">
                <van-datetime-picker
                  type="date"
                  :min-date="minDate"
                  :max-date="yesterday"
                  title="选择年月日"
                  @confirm="onConfirmbirthDay"
                  @cancel="showbirthDayPicker = false"
                ></van-datetime-picker>
              </van-popup>
            </div>
            <div class="xian">
              <div class="marginBottom"></div>
            </div>
            <div class="form-item spaceBetween">
              <label>手机号码</label>
              <van-field
                clickable
                v-model="form.phone"
                placeholder="为方便医生联络您，请填写正确手机号"
                :rules="[{ validator, message: '请填写正确手机号' }]"
              ></van-field>
            </div>
            <div class="xian">
              <div class="marginBottom"></div>
            </div>
            <div class="form-item spaceBetween">
              <div class="upload-title">
                <label>{{illHistory}}</label>
                <div class="select-input" v-if="formType != 4">(选填)</div>
              </div>
              <van-field
                v-if="formType == 4"
                v-model="form.medicalHistory"
                rows="3"
                autosize
                type="textarea"
                maxlength="50"
                :placeholder="desciption"
                show-word-limit
                :rules="[{ validator: minTen, message: `${illHistory}字数不能小于10个字` }]"
              ></van-field>
              <van-field
                v-if="formType != 4"
                v-model="form.medicalHistory"
                rows="3"
                autosize
                type="textarea"
                maxlength="50"
                :placeholder="desciption"
                show-word-limit
              ></van-field>
            </div>
            <div class="xian">
              <div class="marginBottom"></div>
            </div>
          </div>
          <!--国内陪诊-->
          <div v-if="formType == 3">
            <div class="form-item spaceBetween">
              <label>机构类型</label>
              <div class="sex-group">
                <div class="button" @click="form.orgType = 1" :class="form.orgType === 1 ? 'bcSuccse': ''">医院</div>
              </div>
            </div>
            <div class="xian">
              <div class="marginBottom"></div>
            </div>
            <div class="form-item spaceBetween">
              <label>预约医院</label>
              <van-field
                readonly
                clickable
                name="picker"
                :value="form.mechanism"
                placeholder="请选择预约机构"
                @click="showmechanism = true"
                style="text-align:center"
                :rules="[{ pattern, message: '请选择预约机构' }]"
              ></van-field>
              <van-popup v-if="form.orgType == 2" v-model="showmechanism" :style="{ height: '100%',width: '100%'}"
                         :closeable="true">
                <mechanism :specId="specId" @getmechanism="getmechanism"></mechanism>
              </van-popup>
              <van-popup v-else v-model="showmechanism" :style="{ height: '100%', width: '100%' }"
                         :closeable="true">
                <alert-tem @selectItem="selectPeizhen"></alert-tem>
              </van-popup>
            </div>
            <div class="xian">
              <div class="marginBottom"></div>
            </div>
            <div class="form-item spaceBetween">
              <label>见面城市</label>
              <van-field
                clickable
                readonly
                name="area"
                class="input"
                :value="area"
                placeholder="请选择省市区"
                @click="showArea = true"
                :rules="[{ pattern, message: '请选择省市区' }]"
              ></van-field>
              <van-popup v-model="showArea" position="bottom">
                <van-area
                  :area-list="areaList"
                  @confirm="onAreaConfirm"
                  @cancel="showArea = false"
                ></van-area>
              </van-popup>
            </div>
            <div class="xian">
              <div class="marginBottom"></div>
            </div>
            <div class="form-item spaceBetween">
              <label>见面地点</label>
              <van-field
                clickable
                v-model="form.addressDetails"
                placeholder="输入您的详细地址"
                :rules="[{ pattern, message: '输入您的详细地址' }]"
              ></van-field>
            </div>
            <div class="form-item spaceBetween">
              <label>见面时间</label>
              <van-field
                readonly
                clickable
                name="datePicker"
                :value="form.appointmentDateDetails"
                placeholder="请选择见面时间"
                @click="showappointmentDate = true"
                :rules="[{ pattern, message: '请选择见面时间' }]"
              ></van-field>
              <van-popup v-model="showappointmentDate" position="bottom">
                <van-datetime-picker
                  type="datetime"
                  @confirm="onappointmentDateDetails"
                  @cancel="showappointmentDate = false"
                  :min-date="currentDate"
                ></van-datetime-picker>
              </van-popup>
            </div>
          </div>
          <!--国内二诊-->
          <div v-if="formType == 5">
            <div class="form-item spaceBetween">
              <label>预约医院</label>
              <van-field
                readonly
                clickable
                name="picker"
                :value="form.organization"
                placeholder="请选择预约医院"
                @click="showorganization = true"
                style="text-align: center"
                :rules="[{ pattern, message: '请选择预约医院' }]"
              ></van-field>
              <van-popup v-model="showorganization" :style="{ height: '100%', width: '100%' }"
                         :closeable="true">
                <alert-tem @selectItem="selectItem"></alert-tem>
              </van-popup>
            </div>
            <div class="xian">
              <div class="marginBottom"></div>
            </div>
            <div class="form-item spaceBetween" v-if="showLittle">
              <div class="upload-title">
                <label>选择分院</label>
              </div>
              <van-field
                readonly
                clickable
                name="picker"
                :value="form.littleHospital"
                placeholder="请选择"
                @click="showlittleHospital= true"
                style="text-align: center"
              ></van-field>
              <van-popup v-model="showlittleHospital" position="bottom">
                <van-picker
                  show-toolbar
                  :columns="littleHospitalList"
                  value-key="name"
                  @confirm="onlittleHospital"
                  @cancel="showTitle = false"
                ></van-picker>
              </van-popup>
            </div>
            <div class="xian">
              <div class="marginBottom"></div>
            </div>
            <div class="form-item spaceBetween">
              <label>预约科室</label>
              <van-field
                readonly
                clickable
                name="picker"
                :value="form.depart"
                placeholder="请选择预约科室"
                @click="showdepart = true"
                style="text-align: center"
                :rules="[{ pattern, message: '请选择预约科室' }]"
              ></van-field>
              <van-popup v-model="showdepart" position="bottom">
                <van-tree-select
                  :items="showdepartList"
                  :active-id="form.departId"
                  :main-active-index="mainActiveIndex"
                  @click-nav="onClickNav"
                  @click-item="onClickItem"
                ></van-tree-select>

              </van-popup>
            </div>
            <div class="xian">
              <div class="marginBottom"></div>
            </div>
            <div class="form-item spaceBetween">
              <div class="upload-title">
                <label>预约职称</label>
                <div class="select-input">(选填)</div>
              </div>
              <van-field
                readonly
                clickable
                name="picker"
                :value="form.title"
                placeholder="请选择"
                @click="showTitle= true"
                style="text-align: center"
              ></van-field>
              <van-popup v-model="showTitle" position="bottom">
                <van-picker
                  show-toolbar
                  :columns="titleList"
                  value-key="name"
                  @confirm="onTitleConfirm"
                  @cancel="showTitle = false"
                ></van-picker>
              </van-popup>
            </div>
            <div class="xian">
              <div class="marginBottom"></div>
            </div>
            <div class="form-item spaceBetween">
              <div class="upload-title">
                <label>医生姓名</label>
                <div class="select-input">(选填)</div>
              </div>
              <van-field
                clickable
                v-model="form.doctor"
                placeholder="请输入医生姓名"
              ></van-field>
            </div>
            <div class="xian">
              <div class="marginBottom"></div>
            </div>
            <div class="form-item spaceBetween">
              <div class="upload-title">
                <label>二诊诉求</label>
              </div>
              <van-field
                clickable
                v-model="form.demands"
                placeholder="请输入二诊诉求"
                :rules="[{ pattern, message: '请输入二诊诉求' }]"
              ></van-field>
            </div>
            <div class="xian">
              <div class="marginBottom"></div>
            </div>
            <div class="form-item spaceBetween">
              <label>期望报告时间</label>
              <van-field
                readonly
                clickable
                name="datePicker"
                :value="form.expectedDate"
                placeholder="选择期望报告时间"
                @click="showexpectedDate = true"
                :rules="[{ pattern, message: '选择期望报告时间' }]"
              ></van-field>
              <van-popup v-model="showexpectedDate" position="bottom">
                <van-datetime-picker
                  type="date"
                  title="选择年月日"
                  @confirm="onexpectedDate"
                  :min-date="currentDate"
                  @cancel="showexpectedDate = false"
                ></van-datetime-picker>
              </van-popup>
            </div>
          </div>
          <!--健康体检-->
          <div v-if="formType == 2">
            <div class="xian">
              <div class="marginBottom"></div>
            </div>
            <div class="form-item spaceBetween">
              <div class="upload-title">
                <label>选择平台</label>
                <div class="select-input"></div>
              </div>
              <van-field
                readonly
                clickable
                name="picker"
                :value="form.examinationPlatformName"
                placeholder="请选择体检平台"
                @click="changePlatform"
                style="text-align: center"
              ></van-field>
              <van-popup v-model="showExaminationPlatform" position="bottom">
                <van-picker
                  show-toolbar
                  :columns="examinationPlatformList"
                  value-key="name"
                  @confirm="onExaminationPlatform"
                  @cancel="showExaminationPlatform = false"
                ></van-picker>
              </van-popup>
            </div>
            <div class="xian">
              <div class="marginBottom"></div>
            </div>
            <div class="form-item spaceBetween">
              <label>体检分院省份</label>
              <van-field
                clickable
                readonly
                name="area"
                class="input"
                :value="mechanismProvice"
                placeholder="请选择体检分院省份"
                @click="getProvince"
                :rules="[{ pattern, message: '请选择体检分院省份' }]"
              />
              <van-popup v-model="showPrince" position="bottom">
                <van-picker
                  show-toolbar
                  :columns="proviceList"
                  value-key="name"
                  @confirm="onProvinceConfirm"
                  @cancel="showPrince = false"
                ></van-picker>
              </van-popup>
            </div>
            <div class="xian">
              <div class="marginBottom"></div>
            </div>
            <div class="form-item spaceBetween">
              <label>体检分院城市</label>
              <van-field
                clickable
                readonly
                name="area"
                class="input"
                :value="mechanismCity"
                placeholder="请选择体检分院城市"
                @click="getCity"
                :rules="[{ pattern, message: '请选择体检分院城市' }]"
              />
              <van-popup v-model="showCity" position="bottom">
                <van-picker
                  show-toolbar
                  :columns="cityList"
                  value-key="name"
                  @confirm="onCityConfirm"
                  @cancel="showCity = false"
                ></van-picker>
              </van-popup>
            </div>
            <div class="xian">
              <div class="marginBottom"></div>
            </div>
            <div class="form-item spaceBetween">
              <label>选择分店</label>
              <van-field
                readonly
                clickable
                name="picker"
                :value="form.mechanism"
                placeholder="请选择分店"
                @click="onMechanis"
                style="text-align: center"
                :rules="[{ pattern, message: '请选择预约预约分店' }]"
              />
              <van-popup class="acD" v-model="showmechanism" position="bottom" :style="{ height: '100%',width: '100%'}"
                         :closeable="true">
                <mechanism :specId="specId" :mechanismProvice="mechanismProvice" :mechanismCity="mechanismCity"
                           @getmechanism="getmechanism" :orgId="form.examinationPlatformId"></mechanism>
              </van-popup>
            </div>
            <div class="xian">
              <div class="marginBottom"></div>
            </div>
            <div class="form-item spaceBetween">
              <label>期望时间</label>
              <van-field
                readonly
                clickable
                name="datePicker"
                :value="form.appointmentDate"
                placeholder="选择期期望时间"
                @click="showappointmentDate = true"
                :rules="[{ pattern, message: '选择期期望时间' }]"
              />
              <van-popup v-model="showappointmentDate" position="bottom">
                <van-datetime-picker
                  type="date"
                  @confirm="onappointmentDate"
                  @cancel="showappointmentDate = false"
                  :min-date="tjDate"
                />
              </van-popup>
            </div>
            <div class="xian">
              <div class="marginBottom"></div>
            </div>
            <div class="form-item spaceBetween">
              <label>体检时段</label>
              <van-field
                readonly
                clickable
                name="picker"
                :value="form.timeSlotname"
                placeholder="请选择"
                @click="showtimeSlot = true"
                style="text-align: center"
                :rules="[{ pattern, message: '请选择体检时段' }]"
              />
              <van-popup v-model="showtimeSlot" position="bottom">
                <van-picker
                  show-toolbar
                  :columns="tjTimeList"
                  @confirm="ontimeSlot"
                  value-key="name"
                  @cancel="showtimeSlot = false"
                />
              </van-popup>
            </div>
          </div>
          <!--齿科服务-->
          <div v-if="formType == 13">
            <div class="xian">
              <div class="marginBottom"></div>
            </div>
            <div class="form-item spaceBetween">
              <div class="upload-title">
                <label>选择服务套餐</label>
                <div class="select-input"></div>
              </div>
              <van-field
                readonly
                clickable
                name="picker"
                :value="form.servemealName"
                placeholder="请选择服务套餐"
                @click="changeservemeal"
                style="text-align: center"
              ></van-field>
              <van-popup v-model="showservemeal" position="bottom">
                <van-picker
                  show-toolbar
                  :columns="servemealList"
                  value-key="name"
                  @confirm="onservemeal"
                  @cancel="showservemeal = false"
                ></van-picker>
              </van-popup>
            </div>
            <div class="xian">
              <div class="marginBottom"></div>
            </div>
            <div class="form-item spaceBetween">
              <div class="upload-title">
                <label>选择服务机构</label>
                <div class="select-input"></div>
              </div>
              <van-field
                readonly
                clickable
                name="picker"
                :value="form.teethPlatformName"
                placeholder="请选择服务机构"
                @click="changeteethPlatform"
                style="text-align: center"
              ></van-field>
              <van-popup v-model="showteethPlatform" position="bottom">
                <van-picker
                  show-toolbar
                  :columns="servemealplatformList"
                  value-key="name"
                  @confirm="onteethPlatform"
                  @cancel="showteethPlatform = false"
                ></van-picker>
              </van-popup>
            </div>
            <div class="xian">
              <div class="marginBottom"></div>
            </div>
            <div class="form-item spaceBetween">
              <label>服务机构省份</label>
              <van-field
                clickable
                readonly
                name="area"
                class="input"
                :value="mechanismProvice"
                placeholder="请选择服务机构省份"
                @click="getProvince"
                :rules="[{ pattern, message: '请选择服务机构省份' }]"
              />
              <van-popup v-model="showPrince" position="bottom">
                <van-picker
                  show-toolbar
                  :columns="proviceList"
                  value-key="name"
                  @confirm="onProvinceConfirm"
                  @cancel="showPrince = false"
                ></van-picker>
              </van-popup>
            </div>
            <div class="xian">
              <div class="marginBottom"></div>
            </div>
            <div class="form-item spaceBetween">
              <label>服务机构城市</label>
              <van-field
                clickable
                readonly
                name="area"
                class="input"
                :value="mechanismCity"
                placeholder="请选择服务机构城市"
                @click="getCity"
                :rules="[{ pattern, message: '请选择服务机构城市' }]"
              />
              <van-popup v-model="showCity" position="bottom">
                <van-picker
                  show-toolbar
                  :columns="cityList"
                  value-key="name"
                  @confirm="onCityConfirm"
                  @cancel="showCity = false"
                ></van-picker>
              </van-popup>
            </div>
          <!--  <div class="xian">
              <div class="marginBottom"></div>
            </div>
            <div class="form-item spaceBetween">
              <label>服务机构区域</label>
              <van-field
                clickable
                readonly
                name="area"
                class="input"
                :value="mechanismDistrict"
                placeholder="请选择服务机构区域"
                @click="getDistrict"
                :rules="[{ pattern, message: '请选择服务机构区域' }]"
              />
              <van-popup v-model="showDistrict" position="bottom">
                <van-picker
                  show-toolbar
                  :columns="districtList"
                  value-key="name"
                  @confirm="onDistrictConfirm"
                  @cancel="showDistrict = false"
                ></van-picker>
              </van-popup>
            </div>-->
            <div class="xian">
              <div class="marginBottom"></div>
            </div>
            <div class="form-item spaceBetween">
              <label>选择分店</label>
              <van-field
                readonly
                clickable
                name="picker"
                :value="form.teethHospitalName"
                placeholder="请选择分店"
                @click="onteethHospital"
                style="text-align: center"
                :rules="[{ pattern, message: '请选择预约预约分店' }]"
              />
              <van-popup class="acD" v-model="showteethHospital" position="bottom"
                         :style="{ height: '100%',width: '100%'}"
                         :closeable="true">
                <teethhospital :mechanismProvice="mechanismProvice" :mechanismCity="mechanismCity"
                               :productId="productId"
                               @getteethhos="getteethhos" :orgId="form.examinationPlatformId"></teethhospital>
              </van-popup>
            </div>
            <div class="xian">
              <div class="marginBottom"></div>
            </div>
            <div class="form-item spaceBetween">
              <label>期望时间</label>
              <van-field
                readonly
                clickable
                name="datePicker"
                :value="form.appointmentDate"
                placeholder="选择期期望时间"
                @click="showappointmentDate = true"
                :rules="[{ pattern, message: '选择期期望时间' }]"
              />
              <van-popup v-model="showappointmentDate" position="bottom">
                <van-datetime-picker
                  type="date"
                  @confirm="onappointmentDate"
                  @cancel="showappointmentDate = false"
                  :min-date="tjDate"
                />
              </van-popup>
            </div>
            <div class="xian">
              <div class="marginBottom"></div>
            </div>
            <div class="form-item spaceBetween">
              <label>服务时段</label>
              <van-field
                readonly
                clickable
                name="picker"
                :value="form.timeSlotname"
                placeholder="请选择"
                @click="showtimeSlot = true"
                style="text-align: center"
                :rules="[{ pattern, message: '请选择服务时段' }]"
              />
              <van-popup v-model="showtimeSlot" position="bottom">
                <van-picker
                  show-toolbar
                  :columns="tjTimeList"
                  @confirm="ontimeSlot"
                  value-key="name"
                  @cancel="showtimeSlot = false"
                />
              </van-popup>
            </div>
          </div>
          <!--快速就医-->
          <div v-if="formType == 1">
            <div class="form-item spaceBetween">
              <label>预约医院</label>
              <van-field
                readonly
                clickable
                name="picker"
                :value="form.organization"
                placeholder="请选择预约医院"
                @click="showorganization = true"
                style="text-align: center"
                :rules="[{ pattern, message: '请选择预约医院' }]"
              ></van-field>
              <van-popup v-model="showorganization" :style="{ height: '100%', width: '100%' }"
                         :closeable="true">
                <alert-tem @selectItem="selectItem"></alert-tem>
              </van-popup>
            </div>
            <div class="xian">
              <div class="marginBottom"></div>
            </div>
            <div class="form-item spaceBetween" v-if="showLittle">
              <div class="upload-title">
                <label>选择分院</label>
              </div>
              <van-field
                readonly
                clickable
                name="picker"
                :value="form.littleHospital"
                placeholder="请选择"
                @click="showlittleHospital= true"
                style="text-align: center"
              ></van-field>
              <van-popup v-model="showlittleHospital" position="bottom">
                <van-picker
                  show-toolbar
                  :columns="littleHospitalList"
                  value-key="name"
                  @confirm="onlittleHospital"
                  @cancel="showTitle = false"
                ></van-picker>
              </van-popup>
            </div>
            <div class="xian">
              <div class="marginBottom"></div>
            </div>
            <div class="form-item spaceBetween">
              <label>预约科室</label>
              <van-field
                readonly
                clickable
                name="picker"
                :value="form.depart"
                placeholder="请选择预约科室"
                @click="showdepart = true"
                :rules="[{ pattern, message: '请选择预约科室' }]"
                style="text-align: center"
              ></van-field>
              <van-popup v-model="showdepart" position="bottom">
                <van-tree-select
                  :items="showdepartList"
                  :active-id="form.departId"
                  :main-active-index="mainActiveIndex"
                  @click-nav="onClickNav"
                  @click-item="onClickItem"
                ></van-tree-select>
                <div v-if="!isHosptal" style="text-align: center">
                  该医院没有暂无对应科室请选择其他医院
                </div>
              </van-popup>
            </div>
            <div class="xian">
              <div class="marginBottom"></div>
            </div>
            <div class="form-item spaceBetween">
              <div class="upload-title">
                <label>预约职称</label>
                <div class="select-input">(选填)</div>
              </div>
              <van-field
                readonly
                clickable
                name="picker"
                :value="form.title"
                placeholder="请选择预约职称"
                @click="showTitle= true"
                style="text-align: center"
              ></van-field>
              <van-popup v-model="showTitle" position="bottom">
                <van-picker
                  show-toolbar
                  :columns="titleList"
                  @confirm="onTitleConfirm"
                  value-key="name"
                  @cancel="showTitle = false"
                ></van-picker>
              </van-popup>
            </div>
            <div class="xian">
              <div class="marginBottom"></div>
            </div>
            <div class="form-item spaceBetween">
              <div class="upload-title">
                <label>医生姓名</label>
                <div class="select-input">(选填)</div>
              </div>
              <van-field
                clickable
                v-model="form.doctor"
                placeholder="请输入医生姓名"
              ></van-field>
            </div>
            <div class="xian">
              <div class="marginBottom"></div>
            </div>
            <div class="form-item spaceBetween">
              <label>就诊时间</label>
              <van-field
                readonly
                clickable
                name="datePicker"
                :value="form.appointmentDate"
                placeholder="选择期就诊时间"
                @click="showappointmentDate = true"
                :rules="[{ pattern, message: '选择期就诊时间' }]"
              ></van-field>
              <van-popup v-model="showappointmentDate" position="bottom">
                <van-datetime-picker
                  type="date"
                  @confirm="onappointmentDate"
                  :min-date="currentDate"
                  @cancel="showappointmentDate = false"
                ></van-datetime-picker>
              </van-popup>
            </div>
            <div class="xian">
              <div class="marginBottom"></div>
            </div>
            <div class="form-item spaceBetween">
              <label>就诊时段</label>
              <van-field
                readonly
                clickable
                name="picker"
                :value="form.timeSlotname"
                placeholder="请选择"
                @click="showtimeSlot = true"
                style="text-align: center"
                :rules="[{ pattern, message: '请选择就诊时段' }]"
              ></van-field>
              <van-popup v-model="showtimeSlot" position="bottom">
                <van-picker
                  show-toolbar
                  :columns="showTimeList"
                  @confirm="ontimeSlot"
                  value-key="name"
                  @cancel="showtimeSlot = false"
                ></van-picker>
              </van-popup>
            </div>
          </div>
          <!--家庭医生-->
          <div v-if="formType == 12">
            <div class="form-item spaceBetween">
              <label>客户姓名</label>
              <van-field
                clickable
                v-model="form.elevnName"
                placeholder="请填联系人姓名"
                :rules="[{ pattern, message: '请填联系人姓名' }]"
              ></van-field>
            </div>
            <div class="xian">
              <div class="marginBottom"></div>
            </div>
            <div class="form-item spaceBetween">
              <label>手机号码</label>
              <van-field
                clickable
                v-model="form.elevnPhone"
                placeholder="请填写手机号"
                :rules="[{ validator, message: '请填手机号' }]"
              ></van-field>
            </div>
            <div class="xian">
              <div class="marginBottom"></div>
            </div>
            <div class="form-item spaceBetween">
              <div class="upload-title">
                <label>微信号</label>
                <div class="select-input">(选填)</div>
              </div>
              <van-field
                clickable
                v-model="form.wechatId"
                placeholder="是微信号，不是昵称哦"
              ></van-field>
            </div>

            <div class="form-item spaceBetween" @click="showMembers= !showMembers">
              <label>添加家属（选填）</label>
              <label v-if="!showMembers"> > </label>
              <label v-else> v </label>
            </div>

            <div class="members" v-if="showMembers">
              <div class="form-item spaceBetween">
                <label>家属姓名</label>
                <van-field
                  clickable
                  v-model="form.family1name"
                  placeholder="请填写家属姓名"
                ></van-field>
              </div>
              <div class="xian">
                <div class="marginBottom"></div>
              </div>
              <div class="form-item spaceBetween">
                <label>手机号码</label>
                <van-field
                  clickable
                  v-if="showPhone1"
                  v-model="form.family1phone"
                  placeholder="请填写手机号"
                  :rules="[{ validator, message: '请填手机号' }]"
                ></van-field>
                <van-field
                  v-else
                  clickable
                  v-model="form.family1phone"
                  placeholder="请填写手机号"
                ></van-field>
              </div>
              <div class="xian">
                <div class="marginBottom"></div>
              </div>
              <div class="form-item spaceBetween">
                <label>微信号</label>
                <van-field
                  clickable
                  v-model="form.family1wechatId"
                  placeholder="是微信号，不是昵称哦"
                ></van-field>
              </div>
              <div class="xian">
                <div class="marginBottom"></div>
              </div>
            </div>

            <div class="members" v-if="showMembers">
              <div class="form-item spaceBetween">
                <label>家属姓名</label>
                <van-field
                  clickable
                  v-model="form.family2name"
                  placeholder="请填写家属姓名"
                ></van-field>
              </div>
              <div class="xian">
                <div class="marginBottom"></div>
              </div>
              <div class="form-item spaceBetween">
                <label>手机号码</label>
                <van-field
                  v-if="showPhone2"
                  clickable
                  v-model="form.family2phone"
                  placeholder="请填写手机号"
                  :rules="[{ validator, message: '请填手机号' }]"
                ></van-field>
                <van-field
                  v-else
                  clickable
                  v-model="form.family2phone"
                  placeholder="请填写手机号"
                ></van-field>
              </div>
              <div class="xian">
                <div class="marginBottom"></div>
              </div>
              <div class="form-item spaceBetween">
                <label>微信号</label>
                <van-field
                  clickable
                  v-model="form.family2wechatId"
                  placeholder="是微信号，不是昵称哦"
                ></van-field>
              </div>
              <div class="xian">
                <div class="marginBottom"></div>
              </div>
            </div>
          </div>

          <!--高端康养-->
          <div v-if="formType == 11">
            <div class="form-item spaceBetween">
              <label>客户姓名</label>
              <van-field
                clickable
                v-model="form.elevnName"
                placeholder="请填联系人姓名"
                :rules="[{ pattern, message: '请填联系人姓名' }]"
              ></van-field>
            </div>
            <div class="xian">
              <div class="marginBottom"></div>
            </div>
            <div class="form-item spaceBetween">
              <label>手机号码</label>
              <van-field
                clickable
                v-model="form.elevnPhone"
                placeholder="请填写手机号"
                :rules="[{ validator, message: '请填手机号' }]"
              ></van-field>
            </div>
            <div class="xian">
              <div class="marginBottom"></div>
            </div>
            <div class="form-item spaceBetween">
              <label>所在城市</label>
              <van-field
                clickable
                readonly
                name="area"
                class="input"
                :value="elevnArea"
                placeholder="请选择省市区"
                @click="showHighArea = true"
                :rules="[{ pattern, message: '请选择省市区' }]"
              ></van-field>
              <van-popup v-model="showHighArea" position="bottom">
                <van-area
                  :area-list="areaList"
                  @confirm="onAreaHighConfirm"
                  @cancel="showHighArea = false"
                ></van-area>
              </van-popup>
            </div>
            <div class="xian">
              <div class="marginBottom"></div>
            </div>
          </div>

          <div class="xian">
            <div class="marginBottom"></div>
          </div>
          <div class="form-item spaceBetween" v-if="formType != 11 && formType != 12 && formType != 13">
            <div class="upload-title upload-relative">
              <label>上传资料 <span class="helpTip" @click="showHelpTip=true">?</span></label>
              <div class="select-input" v-if="auditFlag == 0">(选填)</div>
            </div>
            <div class="upload-div">
              <van-uploader v-model="attachPath" multiple :max-count="9" :after-read="afterRead"
                            :before-read="beforeRead" @delete="deletefile">
                <div class="plus-iocn-div">
                  <div class="plus-iocn">
                  </div>
                </div>
              </van-uploader>
            </div>
          </div>
          <van-button round block type="info" native-type="submit" class="vanbutton">
            完成填写
          </van-button>
        </div>
      </van-form>
      <van-popup v-model="popupadressWrite" position="bottom" class="popGuige">
        <order-create @dealAddress="dealAddress"></order-create>
      </van-popup>
    </div>
    <van-popup :close-on-click-overlay="clickhide" class="result-div" v-model="showResult">
      <div class="result-relative">
        <img src="../../../assets/image/equity/cancel.png" alt="" class="cancel-result"
             @click="showResult= false">
        <div class="logo">

        </div>
        <div class="tip">
          {{yuyueSuccess}}
        </div>
        <div class="deal" :class="formType==2 || formType == 13? 'textLeft': ''">
          {{yuyueText}}
        </div>
        <div class="result-button bcSuccsee" @click="backMyEquity()">
          返回我的权益
        </div>
      </div>
    </van-popup>
    <van-popup v-model="showDoctorResult" class="result-div">
      <div class="result-relative">
        <div class="doctor-tip">
          您已成功提交服务预约~
        </div>
        <img src="../../../assets/image/equity/cancel.png" alt="" class="cancel-result"
             @click="showDoctorResult= false">
        <div class="doctor-logo">
          <img src="../../../assets/image/equity/form/erwei-code.png" alt="" width="100%" height="100%">
        </div>
        <div class="doctor-deal">
          长按二维码添加医生客服
        </div>
        <div class="doctor-deal2">
          以便我们为您更好的服务~
        </div>
        <div class="doctor-result-button bcSuccsee" @click="backMyEquity()">
          返回我的权益
        </div>
      </div>
    </van-popup>
    <van-popup v-model="showHelpTip" class="result-tip-div">
      <div class="result-relative">
        <img src="../../../assets/image/equity/cancel.png" alt="" class="cancel-result"
             @click="showHelpTip= false">
        <div class="doctor-tip">
          上传资料说明
        </div>
        <div class="tip-help-content">资料包括：诊断证明、病理报告、门诊病历、住院病历等</div>
      </div>
    </van-popup>
    <van-popup :close-on-click-overlay="clickhide" class="lingqu-div" v-model="lingquActivity">
      <div @click="closeLingqu" class="closeac">
        <img alt="" height="100%" src="../../../assets/image/equity/closepng.png" width="100%">
      </div>
      <div class="adtitle">
        <img alt="" class="heicon heiconleft" height="100%" src="../../../assets/image/equity/left.png" width="100%">
        <div>
          <div>您在活动期间完成服务权益</div>
          <div>填写地址领取奖品</div>
        </div>
        <img alt="" class="heicon heiconright" height="100%" src="../../../assets/image/equity/right.png" width="100%">
      </div>
      <div class="formdiv">
        <van-form @failed="addressFailed" @submit="addressSubmit">
          <van-field
            :rules="[{ validator, message: '请输入正确手机号码' }]"
            class="inputfie"
            placeholder="请输入手机号码"
            v-model="addressData.phone"
          />
          <van-field
            :rules="[{ required: true, message: '请输入姓名' }]"
            class="inputfie"
            placeholder="请输入姓名"
            v-model="addressData.name"
          />
          <van-field
            clickable
            readonly
            name="area"
            class="inputfie"
            :value="addressData.address"
            placeholder="请选择省市区"
            @click="showAddressArea = true"
            :rules="[{ pattern, message: '请选择省市区' }]"
          ></van-field>
          <van-field
            :rules="[{ required: true, message: '请输入详细地址' }]"
            class="inputfie"
            placeholder="请输入详细地址"
            v-model="addressData.addressDeails"
          />
          <van-button class="tjbutton">提交收货信息</van-button>
        </van-form>
      </div>

    </van-popup>
    <van-popup v-model="showAddressArea" position="bottom">
      <van-area
        :area-list="areaList"
        @confirm="onAddressArea"
        @cancel="showArea = false"
      ></van-area>
    </van-popup>
  </div>
</template>

<script>
  import area from "../../../common/area";
  import Util from '../../../common/util.js'
  import {Area, Button, Calendar, DatetimePicker, Dialog, Field, Form, Picker, Popup, TreeSelect, Uploader} from "vant";
  import {Toast} from 'mint-ui'
  // import 'vant/lib/Field/style';
  import 'vant/lib/picker/style';
  import 'vant/lib/popup/style';
  import 'vant/lib/datetime-picker/style';
  import 'vant/lib/area/style';
  import 'vant/lib/uploader/style';
  import 'vant/lib/button/style';
  import 'vant/lib/calendar/style';
  import 'vant/lib/tree-select/style';
  import 'vant/lib/dialog/style';

  import {indexMix} from '@/common/mixins.js';
  import Service from "../../../common/service";
  import alertTem from "./components/alert-tem.vue";
  import OrderCreate from "./components/order-create.vue";
  import Mechanism from "./components/mechanism.vue";
  import Teethhospital from "./components/teethhospital.vue";
  import {getDoctorTitle} from "../../../common/formData";
  import {mapActions, mapState} from 'vuex'

  export default {
    name: "equity-form",
    data() {
      return {
        showservemeal: false,
        showteethPlatform: false,
        servemealList: [
          {id: 1, name: "爱康齿科超声洁牙套餐"},
          {id: 2, name: "瑞尔齿科超声洁牙套餐"},
        ],
        numUp: 0,
        specId: this.$route.params.specId.toString(),
        showIdType: false,
        showResult: false,
        showDoctorResult: false,
        showHighArea: false,
        showLittle: false,
        showPrince: false,
        showCity: false,
        showDistrict: false,
        value: '',
        columns: ['我本人', '其他人'],
        hospitalList: [],
        showdepartList: [],
        titleList: [],
        // examinationPlatformList: [],
        organizationList: [],
        mechanismList: [],
        showTimeList: [
          {id: 1, name: '上午'},
          {id: 2, name: '下午'},
          {id: 3, name: '夜间'}
        ],
        tjTimeList: [
          {id: 1, name: '上午'},
          {id: 2, name: '下午'}
        ],
        littleHospitalList: [],
        idTypeList: [
          {id: "01", name: "身份证"},
          {id: "02", name: "港澳居民身份证"},
          {id: "03", name: "居民户口簿"},
          {id: "04", name: "护照"},
          {id: "05", name: "军官证"},
          {id: "06", name: "文职干部证"},
          {id: "07", name: "士兵证"},
          {id: "08", name: "驾驶执照"},
          {id: "09", name: "残疾证"},
          {id: "99", name: "其他"},
        ],
        forWho: '就诊人',
        illHistory: '病情描述',
        showPicker: false,
        showbirthDayPicker: false,
        showArea: false,
        showorganization: false,
        showmechanism: false,
        showteethHospital: false,
        showdepart: false,
        showTitle: false,
        showExaminationPlatform: false,
        showlittleHospital: false,
        showappointmentDate: false,
        showexpectedDate: false,
        showtimeSlot: false,
        showMembers: false,
        isHosptal: true, //是否选择了医院
        areaList: area,
        formType: null,
        popupadressWrite: false,
        pattern: /^[\\s\\S]*.*[^\\s][\\s\\S]*$/,
        minDate: new Date(1900, 12, 12),
        yesterday: this.getYesterday(),
        currentDate: new Date(), // 最小时间味明天
        tjDate: null,
        mechanismProvice: '',
        mechanismCity: '',
        mechanismDistrict: '',
        proviceList: [],
        cityList: [],
        districtList: [],
        yuyueSuccess: '我们会尽快为您安排',
        yuyueText: '预约成功',
        form: {
          name: '',
          sex: 1,
          idType: '01',
          idTypeName: '身份证',
          orgType: 1,
          userCardNo: '',
          birthDay: '', // 生日
          phone: '',
          medicalHistory: '',
          organization: '', // 预约机构
          addressDetails: '',
          doctor: '', //预约医生
          appointmentDate: '', // 就诊时间
          depart: '', // 预约科室
          departId: '', // 预约科室ID
          timeSlotname: '',  // 时段
          timeSlot: '',// 时段id
          attachPath: '',
          mechanism: '', // 健康体检预约机构
          wholeAddress: '',
          expectedDate: '',  // 期望报告时间
          appointmentDateDetails: '',
          demands: '', // 二诊诉求
          hospital: '',
          hospitalId: null,
          elevnPhone: '',
          elevnName: '',
          wechatId: '',
          higcity: '',
          family1wechatId: '',
          family2wechatId: '',
          family1phone: '',
          family2phone: '',
          family1wechatId: '',
          family2wechatId: '',
          littleHospital: '',
          littleHospitalId: '',
          examinationPlatformId: '',
          examinationPlatformName: '',
          // 洁牙服务
          servemealName: '',
          productId: '',
          teethPlatformName: '', //洁牙机构名称
          teethHospitalName: '', //洁牙分院
          teethHospitalId: '', //洁牙分院id
        },
        area: '',
        elevnArea: '',
        consignee: null,
        attachPath: [],
        attachPathUrl: '',
        mainActiveIndex: 0,
        entityFlag: '01',
        userInfo: {},
        statusDetails: null,
        specIdDeatils: null,
        usedName: '就诊人姓名（被保险人）',
        showPhone1: false,
        showPhone2: true,
        showHelpTip: false,
        auditFlag: 0,
        levelNo1: '',
        lingquActivity: false,
        activityId: '',
        submitResId: '',
        clickhide: false,
        addressData: {
          phone: '',
          name: '',
          address: '',
          addressDeails: '',
        },
        showAddressArea: false,
      }
    },
    mixins: [indexMix],
    components: {
      [Form.name]: Form,
      [Field.name]: Field,
      [Popup.name]: Popup,
      [Picker.name]: Picker,
      [DatetimePicker.name]: DatetimePicker,
      [Area.name]: Area,
      [Uploader.name]: Uploader,
      [Button.name]: Button,
      [Calendar.name]: Calendar,
      [TreeSelect.name]: TreeSelect,
      [Dialog.name]: Dialog,
      alertTem,
      OrderCreate,
      Mechanism,
      Teethhospital,
    },
    computed: {
      ...mapState({
        examinationPlatformList: state => state.examinationPlatformList,
      }),
      ...mapState({
        servemealplatformList: state => state.servemealplatformList,
      }),
      ...mapState({
        productId: state => state.productId,
      }),
      desciption: function () {
        return `请填写你的${this.illHistory}`
      }
    },
    methods: {
      ...mapActions(['geteExaminationPlatformList', 'getservemealList']),
      onFailed(errorInfo) {
        Toast({
          message: errorInfo.errors[0].message,
          duration: 1000,
        });
      },
      //返回我的权益
      backMyEquity() {
        this.$router.push({name: 'equity'})
      },
      async getBrithday(e) {
        if (this.form.idType == "01" && e.target.value.length === 18) {
          let birthdayStr = e.target.value.substring(6, 14);
          this.form.birthDay = birthdayStr.substring(0, 4) + "-" + birthdayStr.substring(4, 6) + "-" + birthdayStr.substring(6, 8)
        }
      },
      onMechanis() {
        if (this.mechanismCity == "") {
          Toast('请选择预约服务城市');
          return
        }
        this.showmechanism = true
      },
      onteethHospital() {
        if (this.mechanismCity == "") {
          Toast('请选择预约服务城市');
          return
        }
        this.showteethHospital = true
      },
      async onSubmit() {
        if (this.auditFlag == 1 && this.form.attachPath.length == 0) {
          Toast("请上传资料")
          return
        }
        if (this.entityFlag == '01' && !this.consignee) {
          this.popupadressWrite = true;
          return
        }
        let params = {
          accompany: null,
          consignee: this.consignee,
          diagnosis: null,
          exam: null,
          green: null,
          inquery: null,
          subUser: {},
          reservation: null,
          contNo: this.$route.params.contNo,
          specId: this.$route.params.specId.toString(),
        }
        if (this.$route.params.contNo == 0) {
          delete params.contNo
        }
        let {birthDay, name, phone, sex} = this.form;
        params.subUser = {birthDay, name, phone, sex}
        if (this.$route.params.typeId == "1") {
          // 快速就医
          let {
            appointmentDate, depart, departId, doctor, doctorId, medicalHistory, organization, organizationId, timeSlot,
            title, attachPath, idType, userCardNo, littleHospitalId, littleHospital
          }
            = this.form;
          params.subUser = {
            ...params.subUser, idType, userCardNo,
          }
          params.green = {
            appointmentDate,
            depart,
            departId,
            doctor,
            doctorId,
            medicalHistory,
            organization,
            organizationId,
            title,
            attachPath,
            timeSlot,
          }
          if (this.showLittle) {
            params.green.organization = littleHospital
            params.green.organizationId = littleHospitalId
          }
        } else if (this.$route.params.typeId == "2") {
          // 健康体检
          let {
            appointmentDate, attachPath, city, mechanism, mechanismId,
            medicalHistory, province, timeSlot, idType, userCardNo, hospital, examinationPlatformId
          } = this.form;
          params.exam = {
            appointmentDate,
            attachPath,
            city,
            mechanism: hospital,
            mechanismId: examinationPlatformId,
            medicalHistory,
            province,
            timeSlot,
            hospital: mechanism,
            hospitalId: mechanismId,
          }
          params.subUser = {
            ...params.subUser, idType, userCardNo,
          }
        } else if (this.$route.params.typeId == "13") {
          // 齿科服务
          let {
            province, city,  productId, appointmentDate, attachPath,
            medicalHistory, timeSlot, idType, userCardNo,
            teethPlatformName, examinationPlatformId, teethHospitalId, teethHospitalName, // district,
          } = this.form;
          params.subUser = {
            ...params.subUser, idType, userCardNo,
          }
          params.exam = {
            province, city, appointmentDate, productId,
            attachPath, medicalHistory, timeSlot, mechanism: teethPlatformName, //机构名称 district,
            mechanismId: examinationPlatformId, // 机构id
            hospital: teethHospitalName,//分院名称
            hospitalId: teethHospitalId //分院id
          }
        } else if (this.$route.params.typeId == "3") {
          // 国内陪诊
          let {
            addressDetails, attachPath, city, depart, departId, district, mechanism, mechanismId, appointmentDateDetails,
            medicalHistory, province, wholeAddress, orgType
          } = this.form;
          params.accompany = {
            addressDetails, attachPath, city, depart, departId, district, mechanism, mechanismId,
            medicalHistory, province, wholeAddress, orgType,
            appointmentDate: appointmentDateDetails
          }
        } else if (this.$route.params.typeId == "4") {
          let {attachPath, medicalHistory} = this.form;
          params.inquery = {attachPath, medicalHistory};
        } else if (this.$route.params.typeId == "5") {
          let {
            attachPath, depart, departId, doctor, organization,
            organizationId, expectedDate, title, medicalHistory, demands, littleHospitalId, littleHospital
          } = this.form;
          params.diagnosis = {
            attachPath,
            depart,
            departId,
            doctor,
            organization,
            organizationId,
            expectedDate,
            title,
            medicalHistory,
            demands
          };
          if (this.showLittle) {
            params.diagnosis.organization = littleHospital
            params.diagnosis.organizationId = littleHospitalId
          }
        } else if (this.$route.params.typeId == "11") {
          let {elevnPhone, elevnName, higcity} = this.form;
          params.subUser = null;
          params.reservation = {
            name: elevnName,
            phone: elevnPhone,
            city: higcity
          }
        } else if (this.$route.params.typeId == "12") {
          let {elevnPhone, elevnName, wechatId} = this.form;
          params.subUser = null;
          params.reservation = {
            name: elevnName,
            phone: elevnPhone,
            wechatId,
          }
          if (this.showMembers) {
            let {family1name, family1phone, family1wechatId, family2name, family2phone, family2wechatId} = this.form;
            params.reservation.family1name = family1name
            params.reservation.family1phone = family1phone
            params.reservation.family1wechatId = family1wechatId
            params.reservation.family2name = family2name
            params.reservation.family2phone = family2phone
            params.reservation.family2wechatId = family2wechatId
          }
        }
        let submitRes = null;
        if (this.$route.params.orderId != 0) {
          if (this.statusDetails == 2) {
            delete params.specId;
            submitRes = await Service.goods().editSubmitForm(params, this.$route.params.orderId);
          } else {
            params.specId = this.specIdDeatils;
            submitRes = await Service.goods().submitForm(params);
          }
        } else {
          submitRes = await Service.goods().submitForm(params);
        }
        if (submitRes.errorCode == 0) {
          // 提交成功
          Service.goods().promotionActivity({}, '').then(res => {
            // 有数据返回  // 待领取状态 // 领取人数小于最大人数
            if (res.data && res.data.participantStatus == 1 && (res.data.participantCount < res.data.maxParticipantNumber)) {
              this.activityId = res.data.id;
              // 活动奖品未领取
              if (this.$route.params.typeId == "4") {
                this.submitResId = submitRes.data.id; // 保存咨询id
              }
              this.lingquActivity = true
              return;
            }
            if (this.$route.params.typeId == "12") {
              this.showDoctorResult = true;
              return
            }
            if (this.$route.params.typeId == "4") {
              Service.order().jumpIm({}, submitRes.data.id).then(res => {
                if (res.errorCode == 0) {
                  Toast("提交成功，立即前往问诊~")
                  window.location.href = res.data
                }
              })
              return;
            }
            this.showResult = true;
          })
        }
      },
      // 关闭领取
      closeLingqu() {
        Dialog.confirm({
          confirmButtonText: '继续领取',
          cancelButtonText: '确认关闭',
          confirmButtonColor: '#fb9f3a',
          cancelButtonColor: '#999999',
          title: '提示',
          message: '奖品有限，请尽快领取哦',
        })
          .then(() => {
          })
          .catch(() => {
            this.lingquActivity = false;
            if (this.$route.params.typeId == "12") {
              this.showDoctorResult = true;
            } else if (this.$route.params.typeId == "4") {
              Service.order().jumpIm({}, this.submitResId).then(res => {
                if (res.errorCode == 0) {
                  Toast("提交成功，立即前往问诊~")
                  window.location.href = res.data
                }
              })
            } else {
              this.showResult = true;
            }
          });
      },
      // 国内陪诊医院
      selectPeizhen(val) {
        this.showmechanism = false;
        this.form.mechanism = val.name;
        this.form.mechanismId = val.id;
      },
      async selectItem(val) {
        this.showorganization = false;
        this.form.organization = val.name;
        this.form.organizationId = val.id;
        this.form.depart = '';
        if (val.appSubHospitalVOS && val.appSubHospitalVOS.length > 0) {
          this.littleHospitalList = val.appSubHospitalVOS
          this.showLittle = true;
        }
        if (!val.appSubHospitalVOS || val.appSubHospitalVOS.length == 0) {
          this.showLittle = false;
          await this.getDepartByid(val.id);
        }

      },
      setWords(){
        if(this.formType == 13){
          this.usedName = '就诊人姓名'
          this.yuyueSuccess = '申请提交完成'
          this.yuyueText = '您的申请我们已经受理，因齿科服务客户较多，您的齿科服务时间和机构以短信通知为准，在收到短信通知前，请您耐心等待，我们会尽快为您处理。'
        } else if (this.formType == 2){
          // 健康体检
          this.yuyueSuccess = '申请提交完成'
          this.yuyueText = '您的申请我们已经受理，因体检客户较多，您的体检时间和体检机构以短信通知为准，在收到短信通知前，请您耐心等待，我们会尽快为您处理。'
          this.forWho = "为谁体检";
          this.illHistory = "健康描述";
          this.usedName = "体检人姓名";
        } else if(this.formType == 4){
          this.forWho = "问诊人";
          this.usedName = "问诊人姓名";
        } else if(this.formType == 5){
          this.usedName = "问诊人姓名（被保险人)";
        }
      },
      async getDepartByid(id) {
        const res = await Service.goods().getMainSubList({}, id);
        if (res.data.data.length != 0) {
          this.showdepartList = res.data.data.map((item) => {
            return {
              text: item.alias,
              id: item.id,
              disabled: false,
              children: []
            }
          });
          this.isHosptal = true;
          const childNode0 = await Service.goods().getSubList({}, this.form.organizationId, this.showdepartList[0].id);
          let childArr = childNode0.data.data.map((item) => {
            return {
              text: item.alias,
              id: item.id,
              disabled: false,
              children: null
            }
          });
          this.showdepartList[0].children = childArr;
        }
      },
      getmechanism(val) {
        this.showmechanism = false;
        this.form.mechanism = val.subOrgName;
        this.form.mechanismId = val.subOrgId;
        this.form.depart = '';
      },
      getteethhos(val) {
        this.showteethHospital = false;
        this.form.teethHospitalName = val.subOrgName;
        this.form.teethHospitalId = val.subOrgId;
        this.form.depart = '';
      },
      minTen(val) {
        return val.length > 10
      },
      validator(val) {
        return /^1[3-9]\d{9}$/.test(val);
      },
      idCardvalidator(val) {
        return /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/.test(val);
      },
      // 上传前处理
      beforeRead(file) {
        if (file.size > 10 * 1024 * 1024) {
          Toast({
            message: '文件大小不能超过10M！',
            duration: 1500,
            position: 'top',
          });
          return false
        }
        return true;
      },
      getYesterday() {
        let now = new Date()
        now.setTime(now.getTime() - 24 * 60 * 60 * 1000);
        return new Date(now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate());
      },
      // 文件上传
      async afterRead(file) {
        let formData = new FormData();
        if (file instanceof Array && file.length) { // 判断是否是多图上传 多图则循环添加进去
          file.forEach(async (item) => {
            formData = null
            formData = new FormData();
            formData.append("file", item.file)//第一个参数字符串可以填任意命名，第二个根据对象属性来找到file
            let res = await Service.goods().uploadFile(formData)
            if (res.errorCode == 0) {
              let fileNameNew = formData.get('file').name
              if (fileNameNew.indexOf("*")) {
                fileNameNew = fileNameNew.replace("*", "x")
              }
              if (fileNameNew.indexOf("|")) {
                fileNameNew = fileNameNew.replace("|", "l")
              }
              if (!this.form.attachPath) {
                this.form.attachPath = `${fileNameNew}|${res.data}`
              } else {
                this.form.attachPath = `${this.form.attachPath}*${fileNameNew}|${res.data}`
              }
            }
          })
        } else {
          formData.append('file', file.file);
          let res = await Service.goods().uploadFile(formData)
          if (res.errorCode == 0) {
            let fileNameNew = formData.get('file').name
            if (fileNameNew.indexOf("*")) {
              fileNameNew = fileNameNew.replace("*", "x")
            }
            if (fileNameNew.indexOf("|")) {
              fileNameNew = fileNameNew.replace("|", "l")
            }
            if (!this.form.attachPath) {
              this.form.attachPath = `${fileNameNew}|${res.data}`
            } else {
              this.form.attachPath = `${this.form.attachPath}*${fileNameNew}|${res.data}`
            }
          }
        }
      },
      // 删除图片处理
      deletefile(file) {
        if (file.url) {
          let filename = this.splitString(this.attachPathUrl).find((item) => {
            return item.fileUrl === file.url
          })
          let index = this.splitString(this.attachPathUrl).findIndex((item) => {
            return item.fileUrl === file.url
          })
          let fileNameNew = '';
          if (this.form.attachPath.indexOf("*") > 0) {
            fileNameNew = index == 0 ? `${filename.fileName}` : `*${filename.fileName}`;
          } else {
            fileNameNew = filename.fileName;
          }
          this.form.attachPath = this.form.attachPath.replace(`${fileNameNew}|${file.url}`, '');
        } else {
          let formData = new FormData();
          formData.append("file", file.file)
          let fileNameNew = formData.get('file').name
          let fileUrl = this.splitString(this.form.attachPath).find((item) => {
            return item.fileName === fileNameNew
          })
          let index = this.splitString(this.form.attachPath).findIndex((item) => {
            return item.fileName === fileNameNew
          })
          let fileNameNewdelete = '';
          if (this.form.attachPath.indexOf("*") > 0) {
            fileNameNewdelete = index == 0 ? `${fileNameNew}` : `*${fileNameNew}`;
          } else {
            fileNameNewdelete = fileNameNew
          }
          this.form.attachPath = this.form.attachPath.replace(`${fileNameNewdelete}|${fileUrl.fileUrl}`, '');
        }
      },
      dealAddress(val) {
        this.consignee = val;
        this.popupadressWrite = false;
      },
      onConfirm(value) {
        this.value = value;
        this.showPicker = false;
      },
      onConfirmbirthDay(time) {
        this.form.birthDay = Util.translateDate(time);
        this.showbirthDayPicker = false;
      },
      onAreaConfirm(value) {
        this.area = value.map((item) => item.name).join('/');
        this.form.wholeAddress = value.map((item) => item.name).join('');
        this.form.province = value[0].name;
        this.form.city = value[1].name;
        this.form.district = value[2].name;
        this.showArea = false;
      },
      onAddressArea(value) {
        this.addressData.address = value.map((item) => item.name).join('/');
        this.showAddressArea = false;
      },
      onAreaHighConfirm(value) {
        this.elevnArea = value.map((item) => item.name).join('/');
        this.form.higcity = value.map((item) => item.name).join('/');
        this.showHighArea = false;
      },
      onHospitalConfirm(value) {
        this.form.hospital = value;
        this.showHosptal = false;
      },
      onTitleConfirm(value) {
        this.form.title = value.name;
        this.showTitle = false;
      },
      onExaminationPlatform(value) {
        this.form.hospital = value.name;
        this.form.hospitalId = value.id;
        this.form.examinationPlatformName = value.name;
        this.form.examinationPlatformId = value.id;
        this.showExaminationPlatform = false;
        this.form.mechanism = '';
        this.mechanismProvice = ''
        this.form.provice = ''
        this.mechanismCity = ''
        this.form.city = ''
        this.mechanismDistrict = '';
        this.form.district = '';
      },
      onteethPlatform(value) {
        this.form.teethPlatformName = value.name
        this.form.examinationPlatformId = value.id
        this.showteethPlatform = false;
        this.mechanismProvice = ''
        this.form.provice = ''
        this.mechanismCity = ''
        this.form.city = ''
        this.mechanismDistrict = '';
        this.form.district = '';
        this.form.teethHospitalName = '';
        this.form.teethHospitalId = '';
      },
      async onservemeal(value) {
        await this.getservemealList(
          {
            specId: this.specId,
            productId: value.id,
            levelNo: this.levelNo1
          });
        this.form.productId = value.id;
        this.form.servemealName = value.name;
        this.showservemeal = false;

        this.form.teethPlatformName = ''
        this.form.examinationPlatformId = ''
        this.mechanismProvice = ''
        this.form.provice = ''
        this.mechanismCity = ''
        this.form.city = ''
        this.mechanismDistrict = '';
        this.form.district = '';
        this.form.teethHospitalName = '';
        this.form.teethHospitalId = '';
        this.form.teethHospitalName = '';
        this.form.teethHospitalId = '';
      },
      getProDuctId(){
        if(this.formType == 2){
          this.geteExaminationPlatformList({
            specId: this.specId,
            levelNo: this.levelNo1
          });
        }else if(this.formType == 13 && this.form.productId){
          this.getservemealList(
            {
              specId: this.specId,
              productId: this.form.productId,
              levelNo: this.levelNo1
            });
        }
      },
      async changePlatform() {
        await this.geteExaminationPlatformList({
          specId: this.specId,
          levelNo: this.levelNo1
        });
        this.showExaminationPlatform = true;
      },
      async changeteethPlatform() {
        if (!this.form.productId) {
          Toast('请选择服务套餐');
          return
        }
        this.showteethPlatform = true;
      },
      changeservemeal() {
        this.showservemeal = true;
      },
      async onlittleHospital(val) {
        this.form.littleHospital = val.name;
        this.form.littleHospitalId = val.id;
        await this.getDepartByid(val.id);
        this.showlittleHospital = false;
      },
      onIdType(value) {
        this.form.idType = value.id;
        this.form.idTypeName = value.name;
        this.showIdType = false;
      },
      onappointmentDate(time) {
        this.showappointmentDate = false;
        this.form.appointmentDate = Util.translateDate(time);
      },
      onappointmentDateDetails(time) {
        this.showappointmentDate = false;
        this.form.appointmentDateDetails = Util.translateDateDetails(time);
        ;
      },
      onexpectedDate(time) {
        this.showexpectedDate = false;
        this.form.expectedDate = Util.translateDate(time);
      },
      getProvince() {
        let errMessage = '';
        if (this.formType == 2) {
          errMessage = '请选择平台'
        } else {
          errMessage = '请选择机构'
        }
        if (!this.form.examinationPlatformId) {
          Toast(errMessage);
          return;
        }
        Service.goods().getProvince({orgId: this.form.examinationPlatformId, productId: this.productId}).then(res => {
          if (res.errorCode == 0) {
            this.proviceList = res.data.data
          }
        })
        this.showPrince = true
      },
      getCity() {
        let errMessage = this.formType == 2 ? '请选择体检分院省份' : '请选择服务机构省份';
        if (this.mechanismProvice === "") {
          Toast(errMessage);
          return;
        }
        Service.goods().getCity({
          province: this.mechanismProvice,
          orgId: this.form.examinationPlatformId,
          productId: this.productId
        }).then(res => {
          if (res.errorCode == 0) {
            this.cityList = res.data.data
          }
        })
        this.showCity = true
      },
      getDistrict() {
        let errMessage = this.formType == 2 ? '请选择体检分院城市' : '请选择服务机构城市'
        if (this.mechanismCity === "") {
          Toast(errMessage);
          return;
        }
        Service.goods().getDistrict({
          province: this.mechanismProvice,
          city: this.mechanismCity,
          orgId: this.form.examinationPlatformId,
          productId: this.productId
        }).then(res => {
          if (res.errorCode == 0) {
            this.districtList = res.data.data
          }
        })
        this.showDistrict = true
      },
      onProvinceConfirm(value) {
        this.showPrince = false;
        this.mechanismProvice = value
        this.form.province = value;
        this.mechanismCity = ''
        this.form.mechanism = '';
        this.form.city = ''
        this.mechanismDistrict = '';
        this.form.district = '';
        this.form.teethHospitalName = '';
        this.form.teethHospitalId = '';
      },
      onCityConfirm(value) {
        this.showCity = false;
        this.mechanismCity = value
        this.form.city = value
        this.form.mechanism = '';
        this.mechanismDistrict = '';
        this.form.district = '';
        this.form.teethHospitalName = '';
        this.form.teethHospitalId = '';
      },
      onDistrictConfirm(value) {
        this.showDistrict = false;
        this.mechanismDistrict = value;
        this.form.district = value;
        this.form.mechanism = '';
        this.form.teethHospitalName = '';
        this.form.teethHospitalId = '';
      },
      async onClickNav(val) {
        let that = this
        const res = await Service.goods().getSubList({}, that.form.organizationId, that.showdepartList[val].id);
        let childArr = res.data.data.map((item) => {
          return {
            text: item.alias,
            id: item.id,
            disabled: false,
            children: null
          }
        });
        that.showdepartList[val].children = childArr;
        this.mainActiveIndex = val
      },
      onClickItem(val) {
        this.form.depart = val.text;
        this.form.departId = val.id;
        this.showdepart = false;
      },
      ontimeSlot(value) {
        this.form.timeSlotname = value.name;
        this.form.timeSlot = value.id;
        this.showtimeSlot = false;
      },
      async getEquityDeatils() {
        const response = await Service.order().getEquityOrderDetail({}, this.$route.params.orderId);
        this.auditFlag = response.data.spec.auditFlag
        this.statusDetails = response.data.serviceInfo.status;
        this.specIdDeatils = response.data.spec.id;
        this.specId = response.data.spec.id
        this.entityFlag = response.data.plan.entityFlag;
        const {name, phone, sex, userCardNo, birthDay} = response.data.subUser
        this.form.name = name
        this.form.phone = phone
        this.form.sex = sex
        this.form.userCardNo = userCardNo
        this.form.birthDay = this.translateDate(birthDay)
        if (this.$route.params.typeId == 1) {

          const {
            appointmentDate,
            depart, departId, doctor, doctorId, medicalHistory, organization, organizationId, title, attachPath,
            timeSlot,
          } = response.data.green
          this.attachPathUrl = attachPath
          this.form.medicalHistory = medicalHistory
          this.form.appointmentDate = appointmentDate
          this.form.depart = depart
          this.form.departId = departId
          if (doctor && doctorId) {
            this.form.doctor = doctor
            this.form.doctorId = doctorId
          }
          this.form.organization = organization
          this.form.organizationId = organizationId
          if (timeSlot == 1) {
            this.form.timeSlotname = "上午"
          }
          if (timeSlot == 2) {
            this.form.timeSlotname = "下午"
          }
          if (timeSlot == 3) {
            this.form.timeSlotname = "夜间"
          }
          if (title) {
            this.form.title = title
          }
          this.form.timeSlot = timeSlot
          this.form.attachPath = attachPath
          if (attachPath.length > 0) {
            this.attachPath = this.splitString(attachPath).map((item) => {
              return {
                url: item.fileUrl
              }
            })
          }
        } else if (this.$route.params.typeId == 2) {
          const {
            appointmentDate, attachPath, city, hospital, hospitalId, mechanism, mechanismId,
            medicalHistory, province, timeSlot
          } = response.data.exam;
          this.form.appointmentDate = appointmentDate;
          this.form.city = city;
          this.mechanismCity = city;
          this.form.province = province;
          this.mechanismProvice = province;
          this.form.examinationPlatformName = mechanism;
          this.form.examinationPlatformId = mechanismId;
          this.form.hospital = hospital;
          this.form.hospitalId = hospitalId;
          this.form.mechanism = hospital;
          this.form.mechanismId = hospitalId;
          this.form.medicalHistory = medicalHistory;
          this.form.timeSlot = timeSlot;
          this.attachPathUrl = attachPath
          if (timeSlot == 1) {
            this.form.timeSlotname = "上午"
          }
          if (timeSlot == 2) {
            this.form.timeSlotname = "下午"
          }
          if (timeSlot == 3) {
            this.form.timeSlotname = "夜间"
          }
          this.area = `${province}/${city}`
          if (attachPath.length > 0) {
            this.attachPath = this.splitString(attachPath).map((item) => {
              return {
                url: item.fileUrl
              }
            })
          }
          this.form.attachPath = attachPath
        } else if (this.$route.params.typeId == 13) {
          const {
            province, city, appointmentDate, attachPath, hospital, hospitalId, mechanism, mechanismId,
            medicalHistory,  timeSlot,productId
          } = response.data.exam;
          this.form.province = province;
          this.form.city = city;
          this.mechanismProvice = province;
          this.mechanismCity = city;
          this.form.appointmentDate = appointmentDate;
          this.form.medicalHistory = medicalHistory;
          this.form.timeSlot = timeSlot;
          this.attachPathUrl = attachPath
          this.form.teethPlatformName = mechanism;
          this.form.examinationPlatformId = mechanismId;
          this.form.teethHospitalName = hospital;
          this.form.teethHospitalId = hospitalId;
          this.form.mechanism = hospital;
          this.form.mechanismId = hospitalId;
          this.form.productId = productId;
          this.form.servemealName = productId == 1 ? '爱康齿科超声洁牙套餐' : '瑞尔齿科超声洁牙套餐'
          if (timeSlot == 1) {
            this.form.timeSlotname = "上午"
          }
          if (timeSlot == 2) {
            this.form.timeSlotname = "下午"
          }
          if (timeSlot == 3) {
            this.form.timeSlotname = "夜间"
          }
          this.area = `${province}/${city}`
          if (attachPath.length > 0) {
            this.attachPath = this.splitString(attachPath).map((item) => {
              return {
                url: item.fileUrl
              }
            })
          }
          this.form.attachPath = attachPath
        } else if (this.$route.params.typeId == 3) {
          const {
            addressDetails, attachPath, city, depart, departId, district, mechanism, mechanismId, appointmentDateDetails,
            medicalHistory, province, wholeAddress, orgType
          } = response.data.accompany;
          this.attachPathUrl = attachPath
          this.form.addressDetails = addressDetails
          this.form.depart = depart
          this.form.departId = departId
          this.form.mechanism = mechanism
          this.form.mechanismId = mechanismId
          this.form.appointmentDateDetails = appointmentDateDetails
          this.form.medicalHistory = medicalHistory
          this.form.wholeAddress = wholeAddress
          this.form.orgType = orgType
          this.form.city = city;
          this.form.district = district;
          this.form.province = province;
          this.area = `${province}/${city}/${district}`
          if (attachPath.length > 0) {
            this.attachPath = this.splitString(attachPath).map((item) => {
              return {
                url: item.fileUrl
              }
            })
          }
          this.form.attachPath = attachPath
        } else if (this.$route.params.typeId == 4) {
          const {medicalHistory, attachPath} = response.data.inquery;
          this.form.attachPath = attachPath
          this.form.medicalHistory = medicalHistory
          this.attachPathUrl = attachPath
          if (attachPath.length > 0) {
            this.attachPath = this.splitString(attachPath).map((item) => {
              return {
                url: item.fileUrl
              }
            })
          }
        } else if (this.$route.params.typeId == 5) {
          let {
            attachPath, depart, departId, doctor, organization,
            organizationId, expectedDate, title, medicalHistory, demands
          } = response.data.diagnosis;
          this.attachPathUrl = attachPath
          this.form.depart = depart
          this.form.departId = departId
          this.form.organization = organization
          this.form.organizationId = organizationId
          this.form.expectedDate = expectedDate
          this.form.medicalHistory = medicalHistory
          this.form.demands = demands
          if (title) {
            this.form.title = title
          }
          if (doctor && doctorId) {
            this.form.doctor = doctor
          }
          this.form.attachPath = attachPath
          if (attachPath.length > 0) {
            this.attachPath = this.splitString(attachPath).map((item) => {
              return {
                url: item.fileUrl
              }
            })
          }
        } else if (this.$route.params.typeId == 11 || this.$route.params.typeId == 12) {
          let {name, phone, wechatId} = response.data.reservation;
          this.form.elevnName = name
          this.form.elevnPhone = phone
          this.form.wechatId = wechatId
        }
      },
      splitString(stringVal) {
        let newArr = []
        if (stringVal.indexOf("*") > -1) {
          newArr = stringVal.split("*").map((item) => {
            return {
              fileName: item.split("|")[0],
              fileUrl: item.split("|")[1],
            }
          })
        } else {
          newArr = [{fileName: stringVal.split("|")[0], fileUrl: stringVal.split("|")[1]}]
        }
        return newArr
      },
      wxLogin() {
        const timestamp = Util.localStorageUtil.get('timestamp');
        const encode_string = Util.localStorageUtil.get('encode_string');
        if (timestamp && encode_string) {
          Service.login().wxlogin({
            encodeString: encodeURIComponent(encode_string),
            timestamp,
          }).then(response => {
            Util.localStorageUtil.clear('timestamp');
            Util.localStorageUtil.clear('encode_string')
            if (response.errorCode == 0) {
              Util.localStorageUtil.set('access_token', response.data.token);
              Util.localStorageUtil.set('loginInfo', response.data);
              this.getLeval();
              if (this.$route.params.orderId != 0) {
                this.getEquityDeatils()
              }
            }
          }, err => {
          })
        }
      },
      getLeval() {
        Service.user().getlevel({}).then(response => {
          if (response.errorCode == 0) {
            this.levelNo1 = response.data.levelNo;
            if(this.$route.params.orderId != 0){
              this.getProDuctId()
            }
          }
        }, err => {
        });
      },
      addressSubmit() {
        let {phone, name, address, addressDeails} = this.addressData
        let params = {
          activityId: this.activityId,
          consigneeName: name,
          consigneePhone: phone,
          consigneeAddress: `${address.replace(/\//g, '')}${addressDeails}`
        }
        Service.goods().receiveActivity(params, '').then(res => {
          if (res.errorCode == 0) {
            Toast('我们会尽快给您寄出礼品，请注意查收');
            this.lingquActivity = false
            if (this.$route.params.typeId == "12") {
              this.showDoctorResult = true;
            } else if (this.$route.params.typeId == "4") {
              Service.order().jumpIm({}, this.submitResId).then(res => {
                if (res.errorCode == 0) {
                  Toast("提交成功，立即前往问诊~")
                  window.location.href = res.data
                }
              })
            } else {
              this.showResult = true;
            }
          }
        })
      },
      addressFailed(errorInfo) {
        Toast({
          message: errorInfo.errors[0].message,
          duration: 1000,
        });
      },
      // 安卓键盘挡住输入框
      onFoucs() {
        window.addEventListener('resize', function () {
          if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') {
            window.setTimeout(function () {
              document.activeElement.scrollIntoView()
            }, 1)
          }
        })
      },
      // 时间格式转换
      translateDate(time) {
        const Odate = new Date(time)
        let year = Odate.getFullYear();
        let month = Odate.getMonth() + 1;
        let day = Odate.getDate();
        if (month < 10) {
          month = "0" + month;
        }
        if (day < 10) {
          day = "0" + day;
        }
        return year + "-" + month + "-" + day;
      },
    },
    mounted() {
      let that = this
      if (that.isIos) {
        window.onpageshow = function (e) {
          if (
            e.persisted ||
            (window.performance && window.performance.navigation.type == 2)
          ) {
            window.location.reload();
          }
        };
      }
    },
    watch: {
      value: function (val) {
        if (val == "我本人") {
          Service.user().getuserInfo({}).then(response => {
            this.form.phone = response.data.phone;
            this.form.name = response.data.name;
            this.form.sex = response.data.sex;
            this.form.Type = response.data.idType;
            this.form.userCardNo = response.data.idNumber;
            if (response.data.idType == 1) {
              this.form.birthDay = response.data.idNumber.substring(6, 10) + "-" + response.data.idNumber.substring(10, 12) + "-" + response.data.idNumber.substring(12, 14)
            }
          }, err => {
          });
        }
        if (val == "其他人") {
          this.form.phone = '';
          this.form.name = '';
          this.form.sex = 1;
          this.form.Type = '';
          this.form.userCardNo = '';
          this.form.birthDay = '';
        }
      },
      form: {
        handler: function (val) {
          if (val.family1name) {
            this.showPhone1 = true
          } else {
            this.showPhone1 = false
          }
          if (val.family2name) {
            this.showPhone2 = true
          } else {
            this.showPhone2 = false
          }
        },
        deep: true
      }
    },
    async created() {
      let that = this
      that.entityFlag = this.$route.params.entityFlag;
      this.auditFlag = this.$route.params.auditFlag;
      document.getElementsByTagName('title')[0].innerHTML = that.$route.params.productPlanShortName;
      that.formType = that.$route.params.typeId; // 表单类行
      this.setWords();
      var u = navigator.userAgent
      if (u.indexOf('Android') > -1 || u.indexOf('Adr') > -1) {
        await this.onFoucs()
      }
      // 验证是否刷新登录token
      const timestamp = Util.localStorageUtil.get('timestamp');
      const encode_string = Util.localStorageUtil.get('encode_string');
      if (timestamp && encode_string) {
        await that.wxLogin();
      } else {
        this.getLeval();
        if (this.$route.params.orderId != 0) {
          this.getEquityDeatils() // 获取权益详情
        }
      }
      that.titleList = await getDoctorTitle(); // 获取医生职称列表
      // 设置时间
      let dateTime = new Date();
      let dataTime4 = new Date();
      dateTime = dateTime.setDate(dateTime.getDate() + 1);
      dataTime4 = dataTime4.setDate(dataTime4.getDate() + 4);
      this.tjDate = new Date(dataTime4); // 设置体检时间为4天后
      this.currentDate = new Date(dateTime); // 设置最小时间为明天
    }
  }
</script>

<style scoped lang="scss">
  .container {
    background: rgb(248, 248, 248);
    overflow-y: scroll;

    .top {
      margin-top: 20rem/$baseFontSize;
    }

    .personmessage {
      margin-top: 20rem/$baseFontSize;
    }

    .form-item {
      padding: 30rem/$baseFontSize 30rem/$baseFontSize;
      box-sizing: border-box;
      background: #fff;

      label {
        line-height: 80rem/$baseFontSize;
        font-size: 32rem/$baseFontSize;
      }
    }

    .sex-group {
      display: flex;

      .button {
        width: 115rem/$baseFontSize;
        height: 60rem/$baseFontSize;
        line-height: 60rem/$baseFontSize;
        border-radius: 10rem/$baseFontSize;
        text-align: center;
      }
    }


    .upload-div {
      flex: 1;
      text-align: right;
      flex-wrap: wrap-reverse;
      padding-left: 40rem/$baseFontSize;
    }

    .input-div {
      .input {
        flex: 1;
      }
    }

    .vanbutton {
      background: #54af9d;
      border-radius: 45rem/$baseFontSize;
      border: 0;
      color: #fff;
      font-size: 32rem/$baseFontSize;
      width: 471rem/$baseFontSize;
      height: 90rem/$baseFontSize;
      margin: 30rem/$baseFontSize auto;
    }

    .result-tip-div {
      overflow: hidden;
      width: 550rem/$baseFontSize;
      height: 400rem/$baseFontSize;
      border-radius: 26rem/$baseFontSize;
      background: #fff;

      .result-relative {
        position: relative;
        text-align: center;
        padding: 0rem/$baseFontSize 40rem/$baseFontSize;
        padding-top: 100rem/$baseFontSize;
      }

      .cancel-result {
        width: 40rem/$baseFontSize;
        height: 40rem/$baseFontSize;
        position: absolute;
        top: 30rem/$baseFontSize;
        right: 30rem/$baseFontSize;
      }
    }

    .result-div {
      overflow: hidden;
      width: 550rem/$baseFontSize;
      min-height: 655rem/$baseFontSize;
      max-height: 800rem/$baseFontSize;
      border-radius: 26rem/$baseFontSize;
      background: #fff;

      .result-relative {
        position: relative;
        text-align: center;
        padding: 80rem/$baseFontSize 60rem/$baseFontSize;

        .cancel-result {
          width: 40rem/$baseFontSize;
          height: 40rem/$baseFontSize;
          position: absolute;
          top: 30rem/$baseFontSize;
          right: 30rem/$baseFontSize;
        }

        .logo {
          margin: 0 auto;
          width: 310rem/$baseFontSize;
          height: 320rem/$baseFontSize;
          background: url("../../../assets/image/equity/form-success.png") no-repeat;
          background-size: cover;
          background-position: center;
        }

        .tip {
          color: #52af9d;
          font-size: 36rem/$baseFontSize;
        }

        .deal {
          font-size: 27rem/$baseFontSize;
          margin-top: 20rem/$baseFontSize;
          color: #999999;
        }

        .doctor-deal {
          font-size: 20rem/$baseFontSize;
          margin-top: 20rem/$baseFontSize;
          color: #999999;
        }

        .doctor-deal2 {
          font-size: 20rem/$baseFontSize;
          margin-top: 5rem/$baseFontSize;
          color: #999999;
        }

        .doctor-logo {
          margin: 0 auto;
          margin-top: 20rem/$baseFontSize;
          width: 290rem/$baseFontSize;
          height: 290rem/$baseFontSize;
        }

        .result-button {
          width: 260rem/$baseFontSize;
          height: 70rem/$baseFontSize;
          line-height: 70rem/$baseFontSize;
          text-align: center;
          color: #fff;
          margin: 0 auto;
          margin-top: 50rem/$baseFontSize;
          font-size: 32rem/$baseFontSize;
          border-radius: 35rem/$baseFontSize;
        }

        .doctor-result-button {
          width: 260rem/$baseFontSize;
          height: 70rem/$baseFontSize;
          line-height: 70rem/$baseFontSize;
          text-align: center;
          color: #fff;
          margin: 0 auto;
          margin-top: 30rem/$baseFontSize;
          font-size: 32rem/$baseFontSize;
          border-radius: 35rem/$baseFontSize;
        }
      }


    }

    /deep/ .van-field__body {
      input, textarea {
        text-align: right;
        font-size: 28rem/$baseFontSize;
        border: none;
      }
    }

    /deep/ .van-field__word-limit {
      text-align: right;
      color: #c0c0c0;
    }

    /deep/ .van-cell {
      flex: 1;
      text-align: right;
      padding-left: 40rem/$baseFontSize;

      input {
        width: 100%;
        overflow: hidden;
      }
    }

    /deep/ .van-cell:after {
      border: none;
    }

    /deep/ .van-uploader__upload {
      width: 150rem/$baseFontSize;
      height: 150rem/$baseFontSize;
      margin: 0;
    }

    /deep/ .van-field__error-message {
      text-align: right;
      color: red;
    }

    /deep/ .van-uploader__wrapper {
      margin-left: 20rem/$baseFontSize;
    }

    /deep/ .van-uploader__preview {
      margin-right: 20rem/$baseFontSize;
    }

    /deep/ .van-uploader__preview:nth-child(3) {
      margin-right: 0;
    }

    /deep/ .van-uploader__preview:nth-child(6) {
      margin-right: 0px;
    }

    /deep/ .van-uploader__preview:nth-child(9) {
      margin-right: 0;
    }

    /deep/ .van-uploader__preview-image {
      width: 150rem/$baseFontSize;
      height: 150rem/$baseFontSize;
      margin: 0;
    }
  }

  .color68 {
    color: #686868;
  }

  .bcSuccse {
    background: #54af9d;
    color: #fff;
  }

  .textLeft {
    text-align: left;
  }

  .select-input {
    text-align: center;
    font-size: 26rem/$baseFontSize;
    color: rgb(159, 159, 159);
  }

  .xian {
    width: 100%;
    padding: 0 30rem/$baseFontSize;
    box-sizing: border-box;

    .marginBottom {
      width: 100%;
      height: 2rem/$baseFontSize;
      background-color: #f3f3f3;
    }
  }

  .plus-iocn-div {
    width: 150rem/$baseFontSize;
    height: 150rem/$baseFontSize;
    background: #f5f6f6;
    border-radius: 8px;
    overflow: hidden;
    position: relative;

    .plus-iocn {
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: -25rem/$baseFontSize;
      margin-left: -25rem/$baseFontSize;
      width: 50rem/$baseFontSize;
      height: 50rem/$baseFontSize;
      background: url("../../../assets/image/equity/plus.png") no-repeat;
      background-size: cover;
      background-position: center;
    }
  }

  .upload-relative {
    position: relative;
  }

  .doctor-tip {
    color: #52af9d;
    font-size: 28rem/$baseFontSize;
  }

  /deep/ .tip-help-content {
    margin-top: 50rem/$baseFontSize;
    font-size: 28rem/$baseFontSize;
  }

  .members {
    padding: 0 20rem/$baseFontSize;
    margin-top: 20rem/$baseFontSize;
  }

  .helpTip {
    position: absolute;
    right: -50rem/$baseFontSize;
    top: 22rem/$baseFontSize;
    height: 30rem/$baseFontSize;
    width: 30rem/$baseFontSize;
    line-height: 30rem/$baseFontSize;
    font-size: 30rem/$baseFontSize;
    text-align: center;
    color: #ed757c;
    font-weight: bold;
    border: 2px solid #ed757c;
    border-radius: 50%;
  }

  /deep/ .acD {
    margin: 0px auto;
    left: 0px;
    right: 0px;
  }

  .lingqu-div {
    width: 523rem/$baseFontSize;
    height: 800rem/$baseFontSize;
    border-radius: 26rem/$baseFontSize;
    background: url("../../../assets/image/equity/addressbg.png") no-repeat center/cover;
    background-size: 100%;

    .closeac {
      top: -1rem;
      right: 0rem/$baseFontSize;
      position: absolute;
      width: 50rem/$baseFontSize;
      height: 50rem/$baseFontSize;
    }

    .adtitle {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 416rem/$baseFontSize;
      text-align: center;
      box-sizing: border-box;
      margin: 0 auto;
      color: #fb9f3a;
      font-size: 20rem/$baseFontSize;
      margin-top: 3.66667rem;

      .heicon {
        width: 35rem/$baseFontSize;
        height: 51rem/$baseFontSize;
      }
    }

    .formdiv {
      margin-top: 30rem/$baseFontSize;
      padding: 0 50rem/$baseFontSize;
    }

    .inputfie {
      margin-bottom: 30rem/$baseFontSize;
    }

    .tjbutton {
      width: 100%;
      height: 70rem/$baseFontSize;
      background-image: linear-gradient(rgb(250, 162, 60), rgb(248, 163, 58));
      color: #fff;
      font-size: 28rem/$baseFontSize;
      text-align: center;
      line-height: 70rem/$baseFontSize;
      border-radius: 48rem/$baseFontSize;
      margin-top: 10rem/$baseFontSize;
    }
  }

  /deep/ .formdiv .van-field__control {
    border-radius: 40rem/$baseFontSize;
    height: 50rem/$baseFontSize;
    font-size: 26rem/$baseFontSize;
    background: #f7f7f7;
    color: #333333;
    text-indent: 40rem/$baseFontSize;
    width: 100%;
  }

  /deep/ .formdiv .van-cell {
    text-align: left;
    padding: 0;
  }

  /deep/ .formdiv .van-field__body {
    input {
      text-align: left;
      font-size: 28rem/$baseFontSize;
      border: none;
    }

    padding: 0;
  }

  /deep/ .van-field__error-message {
    display: none;
  }

  /deep/ .van-popup {
    overflow-y: visible;
  }
</style>
