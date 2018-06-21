namespace KMHSSS
{
    partial class Staff_Home_Frm
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.components = new System.ComponentModel.Container();
            this.menuStrip1 = new System.Windows.Forms.MenuStrip();
            this.admissionMasterToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.billingToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.schoolBillToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.hostelBillToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.vanBillToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.otherBillingToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.schoolBillToolStripMenuItem1 = new System.Windows.Forms.ToolStripMenuItem();
            this.hostelBillToolStripMenuItem1 = new System.Windows.Forms.ToolStripMenuItem();
            this.stationaryBillToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.reportsToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.billingReportsToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.schoolBillReportToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.hostelBillReportToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.vanBillReportToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.otherBillReportToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.schoolReportToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.hostelReportToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.stationaryBillReportToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.dailyReportsToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.overAllBillReportToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.dailyNetBillReportToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.classNameListReportToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.toolStripMenuItem1 = new System.Windows.Forms.ToolStripMenuItem();
            this.exitToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.timer1 = new System.Windows.Forms.Timer(this.components);
            this.Time_Lbl = new System.Windows.Forms.Label();
            this.Date_Lbl = new System.Windows.Forms.Label();
            this.toolStripMenuItem2 = new System.Windows.Forms.ToolStripMenuItem();
            this.menuStrip1.SuspendLayout();
            this.SuspendLayout();
            // 
            // menuStrip1
            // 
            this.menuStrip1.Font = new System.Drawing.Font("Comic Sans MS", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.menuStrip1.Items.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.admissionMasterToolStripMenuItem,
            this.billingToolStripMenuItem,
            this.toolStripMenuItem2,
            this.reportsToolStripMenuItem,
            this.toolStripMenuItem1,
            this.exitToolStripMenuItem});
            this.menuStrip1.Location = new System.Drawing.Point(0, 0);
            this.menuStrip1.Name = "menuStrip1";
            this.menuStrip1.Size = new System.Drawing.Size(1214, 31);
            this.menuStrip1.TabIndex = 0;
            this.menuStrip1.Text = "menuStrip1";
            // 
            // admissionMasterToolStripMenuItem
            // 
            this.admissionMasterToolStripMenuItem.Name = "admissionMasterToolStripMenuItem";
            this.admissionMasterToolStripMenuItem.Size = new System.Drawing.Size(158, 27);
            this.admissionMasterToolStripMenuItem.Text = "&Admission Master";
            this.admissionMasterToolStripMenuItem.Click += new System.EventHandler(this.admissionMasterToolStripMenuItem_Click);
            // 
            // billingToolStripMenuItem
            // 
            this.billingToolStripMenuItem.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.schoolBillToolStripMenuItem,
            this.hostelBillToolStripMenuItem,
            this.vanBillToolStripMenuItem,
            this.otherBillingToolStripMenuItem,
            this.stationaryBillToolStripMenuItem});
            this.billingToolStripMenuItem.Name = "billingToolStripMenuItem";
            this.billingToolStripMenuItem.Size = new System.Drawing.Size(65, 27);
            this.billingToolStripMenuItem.Text = "&Billing";
            // 
            // schoolBillToolStripMenuItem
            // 
            this.schoolBillToolStripMenuItem.Name = "schoolBillToolStripMenuItem";
            this.schoolBillToolStripMenuItem.Size = new System.Drawing.Size(191, 28);
            this.schoolBillToolStripMenuItem.Text = "&School Bill";
            this.schoolBillToolStripMenuItem.Click += new System.EventHandler(this.schoolBillToolStripMenuItem_Click);
            // 
            // hostelBillToolStripMenuItem
            // 
            this.hostelBillToolStripMenuItem.Name = "hostelBillToolStripMenuItem";
            this.hostelBillToolStripMenuItem.Size = new System.Drawing.Size(191, 28);
            this.hostelBillToolStripMenuItem.Text = "&Hostel Bill";
            this.hostelBillToolStripMenuItem.Click += new System.EventHandler(this.hostelBillToolStripMenuItem_Click);
            // 
            // vanBillToolStripMenuItem
            // 
            this.vanBillToolStripMenuItem.Name = "vanBillToolStripMenuItem";
            this.vanBillToolStripMenuItem.Size = new System.Drawing.Size(191, 28);
            this.vanBillToolStripMenuItem.Text = "&Van Bill";
            this.vanBillToolStripMenuItem.Click += new System.EventHandler(this.vanBillToolStripMenuItem_Click);
            // 
            // otherBillingToolStripMenuItem
            // 
            this.otherBillingToolStripMenuItem.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.schoolBillToolStripMenuItem1,
            this.hostelBillToolStripMenuItem1});
            this.otherBillingToolStripMenuItem.Name = "otherBillingToolStripMenuItem";
            this.otherBillingToolStripMenuItem.Size = new System.Drawing.Size(191, 28);
            this.otherBillingToolStripMenuItem.Text = "&Other Billing";
            // 
            // schoolBillToolStripMenuItem1
            // 
            this.schoolBillToolStripMenuItem1.Name = "schoolBillToolStripMenuItem1";
            this.schoolBillToolStripMenuItem1.Size = new System.Drawing.Size(158, 28);
            this.schoolBillToolStripMenuItem1.Text = "&School Bill";
            this.schoolBillToolStripMenuItem1.Click += new System.EventHandler(this.schoolBillToolStripMenuItem1_Click);
            // 
            // hostelBillToolStripMenuItem1
            // 
            this.hostelBillToolStripMenuItem1.Name = "hostelBillToolStripMenuItem1";
            this.hostelBillToolStripMenuItem1.Size = new System.Drawing.Size(158, 28);
            this.hostelBillToolStripMenuItem1.Text = "&Hostel Bill";
            this.hostelBillToolStripMenuItem1.Click += new System.EventHandler(this.hostelBillToolStripMenuItem1_Click);
            // 
            // stationaryBillToolStripMenuItem
            // 
            this.stationaryBillToolStripMenuItem.Name = "stationaryBillToolStripMenuItem";
            this.stationaryBillToolStripMenuItem.Size = new System.Drawing.Size(191, 28);
            this.stationaryBillToolStripMenuItem.Text = "&Stationary Bill";
            this.stationaryBillToolStripMenuItem.Click += new System.EventHandler(this.stationaryBillToolStripMenuItem_Click);
            // 
            // reportsToolStripMenuItem
            // 
            this.reportsToolStripMenuItem.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.billingReportsToolStripMenuItem,
            this.dailyReportsToolStripMenuItem,
            this.classNameListReportToolStripMenuItem});
            this.reportsToolStripMenuItem.Name = "reportsToolStripMenuItem";
            this.reportsToolStripMenuItem.Size = new System.Drawing.Size(82, 27);
            this.reportsToolStripMenuItem.Text = "&Reports";
            // 
            // billingReportsToolStripMenuItem
            // 
            this.billingReportsToolStripMenuItem.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.schoolBillReportToolStripMenuItem,
            this.hostelBillReportToolStripMenuItem,
            this.vanBillReportToolStripMenuItem,
            this.otherBillReportToolStripMenuItem,
            this.stationaryBillReportToolStripMenuItem});
            this.billingReportsToolStripMenuItem.Name = "billingReportsToolStripMenuItem";
            this.billingReportsToolStripMenuItem.Size = new System.Drawing.Size(264, 28);
            this.billingReportsToolStripMenuItem.Text = "&Billing Reports";
            // 
            // schoolBillReportToolStripMenuItem
            // 
            this.schoolBillReportToolStripMenuItem.Name = "schoolBillReportToolStripMenuItem";
            this.schoolBillReportToolStripMenuItem.Size = new System.Drawing.Size(250, 28);
            this.schoolBillReportToolStripMenuItem.Text = "&School Bill Report";
            this.schoolBillReportToolStripMenuItem.Click += new System.EventHandler(this.schoolBillReportToolStripMenuItem_Click);
            // 
            // hostelBillReportToolStripMenuItem
            // 
            this.hostelBillReportToolStripMenuItem.Name = "hostelBillReportToolStripMenuItem";
            this.hostelBillReportToolStripMenuItem.Size = new System.Drawing.Size(250, 28);
            this.hostelBillReportToolStripMenuItem.Text = "&Hostel Bill Report";
            this.hostelBillReportToolStripMenuItem.Click += new System.EventHandler(this.hostelBillReportToolStripMenuItem_Click);
            // 
            // vanBillReportToolStripMenuItem
            // 
            this.vanBillReportToolStripMenuItem.Name = "vanBillReportToolStripMenuItem";
            this.vanBillReportToolStripMenuItem.Size = new System.Drawing.Size(250, 28);
            this.vanBillReportToolStripMenuItem.Text = "&Van Bill Report";
            this.vanBillReportToolStripMenuItem.Click += new System.EventHandler(this.vanBillReportToolStripMenuItem_Click);
            // 
            // otherBillReportToolStripMenuItem
            // 
            this.otherBillReportToolStripMenuItem.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.schoolReportToolStripMenuItem,
            this.hostelReportToolStripMenuItem});
            this.otherBillReportToolStripMenuItem.Name = "otherBillReportToolStripMenuItem";
            this.otherBillReportToolStripMenuItem.Size = new System.Drawing.Size(250, 28);
            this.otherBillReportToolStripMenuItem.Text = "&Other Bill Report";
            // 
            // schoolReportToolStripMenuItem
            // 
            this.schoolReportToolStripMenuItem.Name = "schoolReportToolStripMenuItem";
            this.schoolReportToolStripMenuItem.Size = new System.Drawing.Size(188, 28);
            this.schoolReportToolStripMenuItem.Text = "&School Report";
            this.schoolReportToolStripMenuItem.Click += new System.EventHandler(this.schoolReportToolStripMenuItem_Click);
            // 
            // hostelReportToolStripMenuItem
            // 
            this.hostelReportToolStripMenuItem.Name = "hostelReportToolStripMenuItem";
            this.hostelReportToolStripMenuItem.Size = new System.Drawing.Size(188, 28);
            this.hostelReportToolStripMenuItem.Text = "&Hostel Report";
            this.hostelReportToolStripMenuItem.Click += new System.EventHandler(this.hostelReportToolStripMenuItem_Click);
            // 
            // stationaryBillReportToolStripMenuItem
            // 
            this.stationaryBillReportToolStripMenuItem.Name = "stationaryBillReportToolStripMenuItem";
            this.stationaryBillReportToolStripMenuItem.Size = new System.Drawing.Size(250, 28);
            this.stationaryBillReportToolStripMenuItem.Text = "&Stationary Bill Report";
            this.stationaryBillReportToolStripMenuItem.Click += new System.EventHandler(this.stationaryBillReportToolStripMenuItem_Click);
            // 
            // dailyReportsToolStripMenuItem
            // 
            this.dailyReportsToolStripMenuItem.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.overAllBillReportToolStripMenuItem,
            this.dailyNetBillReportToolStripMenuItem});
            this.dailyReportsToolStripMenuItem.Name = "dailyReportsToolStripMenuItem";
            this.dailyReportsToolStripMenuItem.Size = new System.Drawing.Size(264, 28);
            this.dailyReportsToolStripMenuItem.Text = "&Daily Reports";
            // 
            // overAllBillReportToolStripMenuItem
            // 
            this.overAllBillReportToolStripMenuItem.Name = "overAllBillReportToolStripMenuItem";
            this.overAllBillReportToolStripMenuItem.Size = new System.Drawing.Size(243, 28);
            this.overAllBillReportToolStripMenuItem.Text = "&Over All Bill Report";
            this.overAllBillReportToolStripMenuItem.Click += new System.EventHandler(this.overAllBillReportToolStripMenuItem_Click);
            // 
            // dailyNetBillReportToolStripMenuItem
            // 
            this.dailyNetBillReportToolStripMenuItem.Name = "dailyNetBillReportToolStripMenuItem";
            this.dailyNetBillReportToolStripMenuItem.Size = new System.Drawing.Size(243, 28);
            this.dailyNetBillReportToolStripMenuItem.Text = "&Daily Net Bill Report";
            this.dailyNetBillReportToolStripMenuItem.Click += new System.EventHandler(this.dailyNetBillReportToolStripMenuItem_Click);
            // 
            // classNameListReportToolStripMenuItem
            // 
            this.classNameListReportToolStripMenuItem.Name = "classNameListReportToolStripMenuItem";
            this.classNameListReportToolStripMenuItem.Size = new System.Drawing.Size(264, 28);
            this.classNameListReportToolStripMenuItem.Text = "&Class Name List Report";
            this.classNameListReportToolStripMenuItem.Click += new System.EventHandler(this.classNameListReportToolStripMenuItem_Click);
            // 
            // toolStripMenuItem1
            // 
            this.toolStripMenuItem1.Name = "toolStripMenuItem1";
            this.toolStripMenuItem1.Size = new System.Drawing.Size(84, 27);
            this.toolStripMenuItem1.Text = "&Promote";
            this.toolStripMenuItem1.Click += new System.EventHandler(this.toolStripMenuItem1_Click);
            // 
            // exitToolStripMenuItem
            // 
            this.exitToolStripMenuItem.Name = "exitToolStripMenuItem";
            this.exitToolStripMenuItem.Size = new System.Drawing.Size(53, 27);
            this.exitToolStripMenuItem.Text = "E&xit";
            this.exitToolStripMenuItem.Click += new System.EventHandler(this.exitToolStripMenuItem_Click);
            // 
            // timer1
            // 
            this.timer1.Tick += new System.EventHandler(this.timer1_Tick);
            // 
            // Time_Lbl
            // 
            this.Time_Lbl.AutoSize = true;
            this.Time_Lbl.BackColor = System.Drawing.Color.Transparent;
            this.Time_Lbl.Font = new System.Drawing.Font("Comic Sans MS", 14.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.Time_Lbl.ForeColor = System.Drawing.Color.Red;
            this.Time_Lbl.Location = new System.Drawing.Point(1072, 149);
            this.Time_Lbl.Name = "Time_Lbl";
            this.Time_Lbl.Size = new System.Drawing.Size(67, 27);
            this.Time_Lbl.TabIndex = 9;
            this.Time_Lbl.Text = "label1";
            // 
            // Date_Lbl
            // 
            this.Date_Lbl.AutoSize = true;
            this.Date_Lbl.BackColor = System.Drawing.Color.Transparent;
            this.Date_Lbl.Font = new System.Drawing.Font("Comic Sans MS", 14.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.Date_Lbl.ForeColor = System.Drawing.Color.Red;
            this.Date_Lbl.Location = new System.Drawing.Point(1072, 103);
            this.Date_Lbl.Name = "Date_Lbl";
            this.Date_Lbl.Size = new System.Drawing.Size(67, 27);
            this.Date_Lbl.TabIndex = 8;
            this.Date_Lbl.Text = "label1";
            // 
            // toolStripMenuItem2
            // 
            this.toolStripMenuItem2.Name = "toolStripMenuItem2";
            this.toolStripMenuItem2.Size = new System.Drawing.Size(176, 27);
            this.toolStripMenuItem2.Text = "&Student Bill History";
            this.toolStripMenuItem2.Click += new System.EventHandler(this.toolStripMenuItem2_Click);
            // 
            // Staff_Home_Frm
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.SystemColors.AppWorkspace;
            this.BackgroundImage = global::KMHSSS.Properties.Resources.HM;
            this.BackgroundImageLayout = System.Windows.Forms.ImageLayout.Stretch;
            this.ClientSize = new System.Drawing.Size(1214, 578);
            this.Controls.Add(this.Time_Lbl);
            this.Controls.Add(this.Date_Lbl);
            this.Controls.Add(this.menuStrip1);
            this.MainMenuStrip = this.menuStrip1;
            this.Name = "Staff_Home_Frm";
            this.Text = "Staff Home";
            this.WindowState = System.Windows.Forms.FormWindowState.Maximized;
            this.Load += new System.EventHandler(this.Staff_Home_Frm_Load);
            this.menuStrip1.ResumeLayout(false);
            this.menuStrip1.PerformLayout();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.MenuStrip menuStrip1;
        private System.Windows.Forms.ToolStripMenuItem admissionMasterToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem billingToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem exitToolStripMenuItem;
        private System.Windows.Forms.Timer timer1;
        private System.Windows.Forms.Label Time_Lbl;
        private System.Windows.Forms.Label Date_Lbl;
        private System.Windows.Forms.ToolStripMenuItem schoolBillToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem hostelBillToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem vanBillToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem otherBillingToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem schoolBillToolStripMenuItem1;
        private System.Windows.Forms.ToolStripMenuItem hostelBillToolStripMenuItem1;
        private System.Windows.Forms.ToolStripMenuItem stationaryBillToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem reportsToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem billingReportsToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem schoolBillReportToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem hostelBillReportToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem vanBillReportToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem otherBillReportToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem schoolReportToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem hostelReportToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem stationaryBillReportToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem dailyReportsToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem overAllBillReportToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem dailyNetBillReportToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem classNameListReportToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem toolStripMenuItem1;
        private System.Windows.Forms.ToolStripMenuItem toolStripMenuItem2;
    }
}

