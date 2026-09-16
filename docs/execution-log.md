# Test Execution Log — Round 1

**Environment:** saucedemo.com | **Browser:** Chrome | **Date:** 16 ก.ย. 2569

| ID | Status | Actual Result | Notes / Bug ID |
|---|---|---|---|
| TC-001 | PASS | เข้าหน้า Products สำเร็จ URL เปลี่ยนเป็น /inventory.html เห็นสินค้าครบ 6 รายการตรงตามที่คาด | - |
| TC-002 | PASS | ไม่สามารถ Login ได้ พร้อมแสดงข้อความ "Epic sadface: Sorry, this user has been locked out." ยังอยู่หน้า login ตรงตามที่คาด | - |
| TC-003 | PASS | ไม่สามารถ Login ได้ พร้อมแสดงข้อความ "Epic sadface: Password is required" ยังอยู่หน้า Login ตรงตามที่คาด | - |
| TC-004 | PASS | ไม่สามารถ Login ได้ พร้อมแสดงข้อความ "Epic sadface: Username and password do not match any user in this service" ยังอยู่หน้า Login | Error message เหมือนกับ TC-005 (ไม่แยกบอกว่า username หรือ password ผิด) — เป็นพฤติกรรม security best practice ไม่ใช่ bug |
| TC-005 | PASS | ไม่สามารถ Login ได้ พร้อมแสดงข้อความ "Epic sadface: Username and password do not match any user in this service" ยังอยู่หน้า Login | Error message เหมือนกับ TC-004 ด้วยเหตุผลเดียวกัน |
| TC-006 | PASS | หลังกด Add to cart ปุ่มเปลี่ยนเป็น "Remove" badge บนไอคอนตะกร้าขึ้นเลข 1 เปิดตะกร้าเจอสินค้าจริง ตรงตามที่คาด | - |
| TC-007 | FAIL | รูปภาพสินค้าทั้ง 6 รายการแสดงเป็นรูปหมารูปเดียวกันหมด ไม่ตรงกับชื่อสินค้าที่กำกับไว้เลยแม้แต่ชิ้นเดียว | BUG-001 |
| TC-008 | PASS | ปุ่มเปลี่ยนข้อความเป็น "Price (high to low)" ราคาเรียงจากมากไปน้อยถูกต้องครบทุกรายการ | - |
| TC-009 | PASS | ปุ่มเปลี่ยนข้อความเป็น "Price (low to high)" ราคาเรียงจากน้อยไปมากถูกต้องครบทุกรายการ | - |
| TC-010 | PASS | ปุ่มแสดง "Name (A to Z)" เป็นค่าเริ่มต้นตอนเข้าหน้าใหม่ สินค้าเรียงจาก A ถึง Z ถูกต้อง | - |
| TC-011 | PASS | ปุ่มเปลี่ยนข้อความเป็น "Name (Z to A)" สินค้าเรียงจาก Z ไป A ถูกต้อง | - |
| TC-012 | PASS | กดปุ่ม Remove แล้วสินค้าหายจากรายการในหน้า Cart badge บนไอคอนตะกร้าหายไป | - |
| TC-013 | FAIL | Login ด้วย error_user เพิ่มสินค้าลงตะกร้าได้ปกติ แต่กดปุ่ม Remove แล้วไม่มีอะไรเกิดขึ้น สินค้ายังอยู่ในตะกร้าเหมือนเดิม ไม่มี error message ใดๆ ขึ้นมาให้เห็น | BUG-002 |
| TC-014 | PASS | เพิ่มสินค้าครบ 3 ชิ้น (Backpack, Bike Light, Bolt T-Shirt) badge แสดงเลข "3" ถูกต้อง | - |
| TC-015 | PASS | เปิดหน้า Cart โดยไม่มีสินค้า แสดงหน้าว่างเปล่าปกติ ไม่มี error หรือหน้าจอค้าง | - |
| TC-016 | PASS | เข้าหน้า Checkout: Overview สำเร็จ แสดงรายการสินค้า Payment Shipping และราคารวมถูกต้อง | - |
| TC-017 | PASS | แสดงข้อความสีแดง "Error: Last Name is required" ไม่ผ่านไปหน้าถัดไป | - |
| TC-018 | PASS | กดปุ่ม Cancel แล้วกลับมาหน้า Cart สินค้าที่เคยอยู่ในตะกร้ายังอยู่ครบ ไม่หายไป | - |
| TC-019 | PASS | แสดงหน้า Checkout: Complete! พร้อมข้อความขอบคุณ Badge บนตะกร้าหายไป มีปุ่ม "Back Home" และ "Generate PDF Order" ทั้งสองปุ่ม | ยืนยันแล้วว่ามีปุ่มเพิ่มเติมจริงตามที่ Expected Result ตั้งคำถามไว้ — อัปเดต test-cases.md ให้สมบูรณ์แล้ว ไม่ใช่ bug |
| TC-020 | PASS | ออกจากระบบสำเร็จ กลับมาหน้า Login ไม่เห็นข้อมูล session เก่า | - |
| TC-021 | PASS | ถูก redirect กลับมาหน้า login พร้อม error แจ้งว่าต้อง login ก่อน ไม่เห็นหน้า inventory | - |
| TC-022 | PASS | แสดงสินค้าครบ 6 รายการ พร้อมชื่อ ราคา และรูปภาพครบถ้วน | - |
