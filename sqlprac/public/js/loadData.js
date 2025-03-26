   export function loadData() {
      fetch("/users/data")
        .then(res => res.json())
        .then(data => {
          const list = document.getElementById("banPickList");
          list.innerHTML = "";
          
          // ban, pick을 created_at 기준으로 정렬된 상태라고 가정하고, 최신순으로 그룹화
          const groupSize = 10;
          const total = Math.min(data.ban.length, data.pick.length);
          const groupCount = Math.floor(total / groupSize);

          for (let i = groupCount - 1; i >= 0; i--) {
            const wrapper = document.createElement("div");
            wrapper.className = "group-wrapper";

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.className = "group-checkbox";
            wrapper.appendChild(checkbox);

            const group = document.createElement("div");
            group.className = "group";
            wrapper.appendChild(group);
            // 그룹 클릭 시 체크박스 상태 토글
            group.style.cursor = "pointer";
            group.addEventListener("click", () => {
              checkbox.checked = !checkbox.checked;
            });

            const start = i * groupSize;

            // 각 그룹의 밴/픽 가져오기
            const groupBans = data.ban.slice(start, start + 10);
            const groupPicks = data.pick.slice(start, start + 10);

            // 밴 섹션
            const banTitle = document.createElement("div");
            banTitle.className = "section-title";
            banTitle.textContent = `${i + 1}번째 그룹 벤 데이터`;
            group.appendChild(banTitle);

            ["blue", "red"].forEach(team => {
              const teamTag = document.createElement("div");
              teamTag.className = "team";
              teamTag.innerHTML = `<span>${team}: </span>` +
                groupBans
                  .filter(champ => champ.team === team)
                  .map(champ => `<span class="champ">${champ.name}</span>`)
                  .join('');
              group.appendChild(teamTag);
            });

            // 픽 섹션
            const pickTitle = document.createElement("div");
            pickTitle.className = "section-title";
            pickTitle.textContent = `${i + 1}번째 그룹 픽 데이터`;
            group.appendChild(pickTitle);

            ["blue", "red"].forEach(team => {
              const teamTag = document.createElement("div");
              teamTag.className = "team";
              teamTag.innerHTML = `<span>${team}: </span>` +
                groupPicks
                  .filter(champ => champ.team === team)
                  .map(champ => `<span class="champ">${champ.name}</span>`)
                  .join('');
              group.appendChild(teamTag);
            });

            list.appendChild(wrapper);
          }
        })
        .catch(err => console.error("데이터 불러오기 실패:", err));
    }