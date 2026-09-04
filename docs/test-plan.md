# Test Plan — SauceDemo QA Practice Project

## 1. Objective
ทดสอบระบบ SauceDemo เพื่อฝึกฝนกระบวนการทดสอบแบบครบวงจร ตั้งแต่ manual 
testing จนถึง automation ครอบคลุม flow หลักของการซื้อสินค้า

## 2. Scope

### In scope
- ระบบ login และการจัดการ session
- การแสดงผลและเรียงลำดับสินค้า
- ระบบตะกร้าสินค้า (เพิ่ม/ลบ)
- ขั้นตอนการ checkout
- พฤติกรรมของ user account พิเศษ (locked_out_user, problem_user, error_user)

### Out of scope
- Performance/Load testing — ไม่ใช่จุดประสงค์ของเว็บ demo นี้
- Payment gateway จริง — SauceDemo เป็น demo ไม่มีระบบชำระเงินจริง
- Mobile responsive — จำกัดเวลา เน้น desktop web ก่อน

## 3. Test Approach
- ออกแบบเคสด้วย Equivalence Partitioning, Boundary Value Analysis, 
  Decision Table Testing
- ทดสอบ functional และ negative case ควบคู่กัน
- ใช้ user account 4 แบบที่ SauceDemo เตรียมไว้ให้ครอบคลุมทั้งเคสปกติ
  และเคสที่มี bug ฝังอยู่โดยตั้งใจ

## 4. Test Environment
| รายการ | ค่า |
|---|---|
| URL | https://www.saucedemo.com |
| Browser | Chrome (เวอร์ชันล่าสุด) |
| เครื่องมือ | DevTools, Postman (ถ้าเกี่ยวข้อง) |

## 5. Test Data
| Username | Password | ลักษณะพิเศษ |
|---|---|---|
| standard_user | secret_sauce | ผู้ใช้ปกติ ไม่มี bug |
| locked_out_user | secret_sauce | บัญชีถูกระงับ ต้อง login ไม่ได้ |
| problem_user | secret_sauce | มี bug ด้าน UI (รูปภาพ/การเรียงลำดับ) |
| error_user | secret_sauce | มี bug ตอนทำรายการในหน้า cart |

## 6. Entry Criteria
- [ ] เข้าเว็บ saucedemo.com ได้ปกติ
- [ ] ทราบข้อมูล user account ครบทั้ง 4 แบบ
- [ ] Test Scenario และ Test Case เขียนเสร็จแล้ว

## 7. Exit Criteria
- [ ] รันเคสทั้งหมดครบ 100%
- [ ] Defect ที่พบถูกบันทึกและจัดระดับ severity/priority ครบทุกใบ
- [ ] มี Test Summary Report สรุปผล

## 8. Risks
| ความเสี่ยง | ผลกระทบ | วิธีรับมือ |
|---|---|---|
| เว็บ demo อาจเปลี่ยนพฤติกรรมโดยไม่แจ้งล่วงหน้า | เคสบางอันอาจใช้ไม่ได้ในอนาคต | บันทึกวันที่ทดสอบไว้ในเอกสารเสมอ |
| ไม่มีสิทธิ์เข้าถึง backend/database | ยืนยันข้อมูลได้แค่ผ่าน UI เท่านั้น | ระบุเป็นข้อจำกัดใน scope |

## 9. Deliverables
Test Scenarios, Test Cases, Bug Reports, Automated test scripts 
(Playwright/Cypress/Selenium), Regression scope, UAT document, 
Test Summary Report
