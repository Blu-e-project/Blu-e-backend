# π§ Structure
```
π Blu-e-backend
π config
βββ π baseResponseStatus.js
βββ π database.js
βββ π express.js
βββ π jwtMiddleware.js
βββ π response.js
βββ π winston.js
π src
βββ π app
  βββ π Editing
  βββ π Mentoring
  βββ π Mypage
  βββ π Problem
  βββ π Question
  βββ π Report
  βββ π Review
  βββ π User
  | βββ π userController.js
  | βββ π userDao.js
  | βββ π userProvider.js
  | βββ π userRoute.js
  | βββ π userService.js
π .gitignore
π index.js
π package.json
π README.md
```

## π Commit Message Convention
### Commit Type
β [ADD] : μ½λ μΆκ° λ° λΌμ΄λΈλ¬λ¦¬ μΆκ°, μλ‘μ΄ νμΌ μμ±<br>
β¨ [FEAT] : μλ‘μ΄ κΈ°λ₯ κ΅¬ν<br>
β [MOD] : μ½λ λ° λ΄λΆ νμΌ μμ <br>
π§± [CHORE] : λ¬Έλ² μ€λ₯ ν΄κ²°, νμ λ³κ²½, νμΌ μ΄λ¦ λ³κ²½ λ±μ μ¬μν μ½λ λ° νμΌ μμ <br>
π [DEL] : μΈλͺ¨μλ μ½λλ νμΌ μ­μ <br> 
π [DOCS] : README λ±μ λ¬Έμ κ°μ <br>
π [MOVE] : νλ‘μ νΈ νμΌ λ° μ½λ μ΄λ<br>
π [MERGE] : λ€λ₯Έ λΈλμΉμμ μΆ©λ ν΄κ²° ν Merge<br>
β» [REFACTOR] : μ λ©΄ μμ <br>
π  [SETTING] : κΈ°ν μ€μ <br> 

### Commit Message
- [Commit Type] Commit Explanation <br>
ex ) [FEAT] νμκ°μ κΈ°λ₯ κ΅¬ν

### Pull Request
- PR λͺ©μ  ν λ¬Έμ₯ μ λ¦¬
- νΌλλ°± μμ²­ μ μνλ μμ , νΌλλ°± λ°©ν₯ λͺμ
- Lable νκ·Έ λ¬κΈ° (μμμ€, μ΄λ¦)
