## Login : có 3 acc để login test

## Dashboard: chứa tổng quan (Projects + User Management)
    1. Projects
       + Datasets (render UI + search by name project + filter(all | locked | Open))
       + Modal Versions
    2. User Management
       + Role user: admin, user
          - admin :
                🌿 Quản lý tất cả user và tất cả project
                🌿 Xoá user khỏi hệ thống
                🌿 Xoá user khỏi project
          - user  :
       + Role project: owner, developer, viewer
          - owner: Chỉ quản lý các project và các user thuộc project mà họ quản lý
                🌿 Xoá user khỏi project
          - developer: sẽ đựơc admin,owner add vào project
          - viewer:
