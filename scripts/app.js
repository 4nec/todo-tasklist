document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskButton = document.getElementById('add-task-button');
    const deleteAllButton = document.getElementById("delete-all-button"); 
    
    const taskList = document.getElementById('task-list');
    deleteAllButton.addEventListener("click", deleteAllTasks);

    addTaskButton.addEventListener('click', addTask);
    taskList.addEventListener('click', handleTaskClick);
    // Event listener untuk tombol Add Task
    addTaskButton.addEventListener("click", addTask);

    // Event listener untuk mendeteksi tombol Enter
    taskInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            addTask(); // Panggil fungsi addTask ketika tombol Enter ditekan
        }
    });

    // Fungsi untuk menghapus semua task dengan animasi
    function deleteAllTasks() {
        // Konfirmasi sebelum menghapus semua task
        const confirmation = confirm("Are you sure you want to delete all tasks?");
        
        if (confirmation) {
            const tasks = taskList.getElementsByTagName("li");
            
            // Looping untuk memberikan animasi fade-out pada setiap task
            Array.from(tasks).forEach((task) => {
                task.style.animation = "fadeOut 1s forwards"; // Apply fade-out animation
            });

            // Setelah animasi selesai, hapus semua task
            setTimeout(() => {
                taskList.innerHTML = ""; // Menghapus semua task dari daftar
            }, 1000); // Sesuaikan dengan durasi animasi (1 detik)
        }
        // Jika Cancel ditekan, tidak ada yang terjadi
    }

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === '') return;

        const listItem = document.createElement('li');
        listItem.classList.add('task-item');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('task-checkbox');

        const taskSpan = document.createElement('span');
        taskSpan.textContent = taskText;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-task-button');

        listItem.appendChild(checkbox);
        listItem.appendChild(taskSpan);
        listItem.appendChild(removeButton);

        taskList.appendChild(listItem);
        taskInput.value = '';
    }

    function handleTaskClick(event) {
        if (event.target.classList.contains('remove-task-button')) {
            const taskItem = event.target.parentElement;
            taskItem.classList.add('removed');
            taskItem.addEventListener('transitionend', () => {
                taskList.removeChild(taskItem);
            });
        } else if (event.target.classList.contains('task-checkbox')) {
            const taskItem = event.target.parentElement;
            const taskSpan = taskItem.querySelector('span');
            if (event.target.checked) {
                taskSpan.classList.add('completed');
            } else {
                taskSpan.classList.remove('completed');
            }
        }
    }
});